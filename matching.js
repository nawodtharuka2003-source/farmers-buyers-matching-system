/* CropLink matching engine
 * 1. Eligibility: same crop, asking price within budget, supply > 0, region reachable by road
 * 2. Road distance: Dijkstra's shortest path over a graph of regions
 * 3. Ranking: distance 45% + price fit 35% + supply coverage 20%
 * 4. Allocation: demo heuristic, assigns supply in ranked order, never above listed quantity
 *
 * Works in the browser (window.CropLinkMatching) and in Node (module.exports).
 */
(function (root) {
  'use strict';

  // APPROXIMATE road distances in km between neighbouring regions.
  // PLACEHOLDERS: replace with your own 10 regions and verified distances.
  const ROAD_EDGES = [
    ['Colombo', 'Gampaha', 30],
    ['Colombo', 'Galle', 120],
    ['Galle', 'Matara', 45],
    ['Colombo', 'Kandy', 115],
    ['Colombo', 'Kurunegala', 95],
    ['Gampaha', 'Kurunegala', 75],
    ['Kandy', 'Kurunegala', 42],
    ['Kandy', 'Nuwara Eliya', 78],
    ['Nuwara Eliya', 'Badulla', 55],
    ['Kandy', 'Badulla', 125],
    ['Kurunegala', 'Anuradhapura', 95],
    ['Kandy', 'Anuradhapura', 140],
    ['Anuradhapura', 'Jaffna', 200]
  ];

  const WEIGHTS = { distance: 0.45, price: 0.35, coverage: 0.20 };

  function buildGraph(edges) {
    const g = {};
    edges.forEach(([a, b, km]) => {
      (g[a] = g[a] || {})[b] = km;
      (g[b] = g[b] || {})[a] = km;
    });
    return g;
  }
  const DEFAULT_GRAPH = buildGraph(ROAD_EDGES);
  const REGIONS = Object.keys(DEFAULT_GRAPH).sort();

  // Dijkstra's algorithm. Returns { region: km }. Unreachable regions are Infinity.
  // A simple scan is fine for ~10 regions; use a priority queue for large graphs.
  function shortestDistances(graph, start) {
    const dist = {};
    Object.keys(graph).forEach(n => (dist[n] = Infinity));
    if (!(start in graph)) return dist;
    dist[start] = 0;
    const visited = new Set();
    for (;;) {
      let current = null;
      for (const n in dist) {
        if (!visited.has(n) && (current === null || dist[n] < dist[current])) current = n;
      }
      if (current === null || dist[current] === Infinity) break;
      visited.add(current);
      for (const nb in graph[current]) {
        const alt = dist[current] + graph[current][nb];
        if (alt < dist[nb]) dist[nb] = alt;
      }
    }
    return dist;
  }

  const sameCrop = (a, b) => String(a).trim().toLowerCase() === String(b).trim().toLowerCase();

  // request: { crop, quantity, maxPrice, location }
  // farmer:  { id, product, quantity, price, location }
  function rankFarmers(request, farmers, graph) {
    graph = graph || DEFAULT_GRAPH;
    const km = shortestDistances(graph, request.location);

    const eligible = farmers.filter(f =>
      sameCrop(f.product, request.crop) &&
      Number(f.price) <= Number(request.maxPrice) &&
      Number(f.quantity) > 0 &&
      Number.isFinite(km[f.location])
    );
    if (!eligible.length) return [];

    const maxKm = Math.max(...eligible.map(f => km[f.location]));
    return eligible.map(f => {
      const roadKm = km[f.location];
      const distanceScore = maxKm === 0 ? 1 : 1 - roadKm / maxKm;
      const priceScore = (request.maxPrice - f.price) / request.maxPrice;
      const coverageScore = Math.min(1, f.quantity / request.quantity);
      const score = WEIGHTS.distance * distanceScore + WEIGHTS.price * priceScore + WEIGHTS.coverage * coverageScore;
      return {
        farmer: f, km: roadKm, score,
        parts: { distanceScore, priceScore, coverageScore },
        reasons: [
          roadKm + ' km by road (approximate)',
          'LKR ' + f.price + '/kg, LKR ' + (request.maxPrice - f.price) + ' under budget',
          'can cover ' + Math.round(coverageScore * 100) + '% of the request'
        ]
      };
    }).sort((a, b) => b.score - a.score);
  }

  // DEMO HEURISTIC, not an optimal solution. Requests are handled in the order given
  // (first come, first served). An early request can take supply a later one needed more.
  function allocate(requests, farmers, graph) {
    const stock = new Map(farmers.map(f => [f.id, Number(f.quantity)]));
    const allocations = [];
    const summary = [];
    requests.forEach(req => {
      let need = Number(req.quantity);
      const live = farmers.map(f => Object.assign({}, f, { quantity: stock.get(f.id) }));
      for (const m of rankFarmers(req, live, graph)) {
        if (need <= 0) break;
        const take = Math.min(need, stock.get(m.farmer.id));
        if (take <= 0) continue;
        allocations.push({ requestId: req.id, buyer: req.buyer, crop: req.crop, farmerId: m.farmer.id,
          farmer: m.farmer.name, qty: take, price: m.farmer.price, km: m.km });
        stock.set(m.farmer.id, stock.get(m.farmer.id) - take);
        need -= take;
      }
      const got = Number(req.quantity) - need;
      summary.push({ requestId: req.id, buyer: req.buyer, requested: Number(req.quantity), allocated: got,
        status: got === 0 ? 'Unmatched' : need === 0 ? 'Fully allocated' : 'Partially allocated' });
    });
    return { allocations, summary, remainingStock: stock };
  }

  const api = { ROAD_EDGES, WEIGHTS, REGIONS, buildGraph, DEFAULT_GRAPH, shortestDistances, rankFarmers, allocate };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.CropLinkMatching = api;
})(typeof window !== 'undefined' ? window : this);