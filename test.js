const M = require('./matching.js');
const assert = require('assert');
// Dijkstra: Colombo -> Kandy direct 115; Colombo->Kurunegala->Kandy = 137, so 115
let d = M.shortestDistances(M.DEFAULT_GRAPH, 'Colombo');
assert.strictEqual(d['Kandy'], 115);
assert.strictEqual(d['Matara'], 165);            // Colombo-Galle-Matara
assert.strictEqual(d['Colombo'], 0);
assert.strictEqual(d['Jaffna'], 95 + 95 + 200);  // via Kurunegala-Anuradhapura = 390
// Shortcut check: Gampaha->Kandy = min(30+115, 75+42)=117
assert.strictEqual(M.shortestDistances(M.DEFAULT_GRAPH, 'Gampaha')['Kandy'], 117);
assert.strictEqual(M.shortestDistances({A:{}}, 'Z')['A'], Infinity);

const farmers = [
 {id:'f1',name:'Near',product:'Tomato',quantity:500,price:140,location:'Gampaha'},
 {id:'f2',name:'Far cheap',product:'Tomato',quantity:2000,price:100,location:'Jaffna'},
 {id:'f3',name:'Wrong crop',product:'Rice',quantity:900,price:90,location:'Colombo'},
 {id:'f4',name:'Too pricey',product:'Tomato',quantity:900,price:300,location:'Colombo'},
 {id:'f5',name:'Mid',product:'tomato',quantity:600,price:120,location:'Kurunegala'}
];
const req = {id:'r1',buyer:'B1',crop:'Tomato',quantity:800,maxPrice:200,location:'Colombo'};
const ranked = M.rankFarmers(req, farmers);
assert.deepStrictEqual(ranked.map(r=>r.farmer.id).sort(), ['f1','f2','f5']); // eligibility filter
console.log('ranking:', ranked.map(r=>r.farmer.name+' '+r.score.toFixed(3)+' '+r.km+'km'));
// allocation never exceeds stock, partial fills reported
const res = M.allocate([req, {id:'r2',buyer:'B2',crop:'Tomato',quantity:5000,maxPrice:200,location:'Kandy'}], farmers);
for (const [id,left] of res.remainingStock) assert(left >= 0);
const tot = res.allocations.reduce((s,a)=>s+a.qty,0);
assert(tot <= 500+2000+600);
console.log(res.summary);
console.log('ALL TESTS PASSED');