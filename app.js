import { auth, db } from "./firebase-config.js";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";
import {
    addDoc,
    collection,
    doc,
    getDocs,
    increment,
    onSnapshot,
    query,
    runTransaction,
    serverTimestamp,
    where,
    writeBatch
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

(() => {
    'use strict';

    const locations = {
        Dambulla: { lat: 7.87, lng: 80.65 },
        Anuradhapura: { lat: 8.31, lng: 80.40 },
        Jaffna: { lat: 9.66, lng: 80.02 },
        Kandy: { lat: 7.29, lng: 80.63 },
        Badulla: { lat: 6.99, lng: 81.06 },
        Ampara: { lat: 7.30, lng: 81.67 },
        Galle: { lat: 6.05, lng: 80.22 },
        Kurunegala: { lat: 7.49, lng: 80.36 },
        Polonnaruwa: { lat: 7.94, lng: 81.00 },
        Matale: { lat: 7.47, lng: 80.62 },
        Colombo: { lat: 6.93, lng: 79.85 },
        Negombo: { lat: 7.21, lng: 79.84 },
        NuwaraEliya: { lat: 6.95, lng: 80.78 },
        Ratnapura: { lat: 6.68, lng: 80.40 }
    };
    const locationLabels = {
        Dambulla: 'Dambulla',
        Anuradhapura: 'Anuradhapura',
        Jaffna: 'Jaffna',
        Kandy: 'Kandy',
        Badulla: 'Badulla',
        Ampara: 'Ampara',
        Galle: 'Galle',
        Kurunegala: 'Kurunegala',
        Polonnaruwa: 'Polonnaruwa',
        Matale: 'Matale',
        Colombo: 'Colombo',
        Negombo: 'Negombo',
        NuwaraEliya: 'Nuwara Eliya',
        Ratnapura: 'Ratnapura'
    };

    const initialData = {
        farmers: [
            { id: 'f1', name: 'Nimal Perera', product: 'Rice', quantity: 4200, price: 145, location: 'Dambulla' },
            { id: 'f2', name: 'Saman Kumara', product: 'Tomato', quantity: 1800, price: 165, location: 'Matale' },
            { id: 'f3', name: 'Kumari Silva', product: 'Potato', quantity: 2500, price: 210, location: 'NuwaraEliya' },
            { id: 'f4', name: 'Ruwan Jayasuriya', product: 'Onion', quantity: 3200, price: 175, location: 'Dambulla' },
            { id: 'f5', name: 'Anura Fernando', product: 'Carrot', quantity: 1300, price: 190, location: 'Badulla' },
            { id: 'f6', name: 'Thilini Rajapaksha', product: 'Banana', quantity: 2800, price: 120, location: 'Ampara' },
            { id: 'f7', name: 'Sunil Bandara', product: 'Chili', quantity: 900, price: 245, location: 'Anuradhapura' },
            { id: 'f8', name: 'Mala Wijesinghe', product: 'Cabbage', quantity: 1600, price: 135, location: 'Kandy' },
            { id: 'f9', name: 'Chamara Senanayake', product: 'Rice', quantity: 3500, price: 155, location: 'Polonnaruwa' },
            { id: 'f10', name: 'Iresha Gunawardena', product: 'Tomato', quantity: 2100, price: 155, location: 'Kurunegala' }
        ],
        buyers: [
            { id: 'b1', name: 'Green Basket Co.', product: 'Rice', quantity: 5000, maxPrice: 175, location: 'Colombo' },
            { id: 'b2', name: 'FreshMart Kandy', product: 'Tomato', quantity: 2200, maxPrice: 185, location: 'Kandy' },
            { id: 'b3', name: 'Hill Country Foods', product: 'Potato', quantity: 3000, maxPrice: 230, location: 'Kandy' },
            { id: 'b4', name: 'Southern Harvest', product: 'Banana', quantity: 1800, maxPrice: 145, location: 'Galle' },
            { id: 'b5', name: 'City Grocers', product: 'Onion', quantity: 2600, maxPrice: 195, location: 'Negombo' }
        ]
    };
    const LEGACY_STORAGE_KEY = 'agrilink-demo-v1';
    const LOCAL_CACHE_KEY = 'croplink-firestore-cache-v1';

    let data = getSignedOutData();
    let currentUser = null;
    let harvestChart = null;
    let unsubscribeFarmers = null;
    let unsubscribeBuyers = null;
    const numberFormat = new Intl.NumberFormat('en-LK');
    const formatNumber = value => numberFormat.format(Math.round(value));
    const formatMoney = value => `₨ ${formatNumber(value)}`;
    const getLocationName = key => locationLabels[key] || key;
    const byId = id => document.getElementById(id);
    const initials = name => name.split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase();
    const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[char]));

    const roadEdges = [
        ['Colombo','Peliyagoda',7],['Peliyagoda','Wattala',5],['Wattala','JaEla',9],
        ['JaEla','Seeduwa',5],['Seeduwa','Katunayake',4],['Katunayake','Negombo',7],
        ['Colombo','Kandy',115],['Colombo','Ratnapura',101],['Colombo','Galle',119],
        ['Negombo','Kurunegala',58],['Kurunegala','Matale',57],['Kurunegala','Dambulla',69],
        ['Kurunegala','Anuradhapura',108],['Kurunegala','Jaffna',303],['Ratnapura','Kurunegala',122],
        ['Kurunegala','Kandy',71],['Matale','Kandy',26],
        ['Matale','Dambulla',43],['Matale','Polonnaruwa',96],['Dambulla','Anuradhapura',71],
        ['Dambulla','Polonnaruwa',61],['Dambulla','NuwaraEliya',139],['Anuradhapura','Jaffna',204],
        ['Anuradhapura','Polonnaruwa',108],['Kandy','NuwaraEliya',75],['Kandy','Badulla',126],
        ['NuwaraEliya','Badulla',77],['Badulla','Ampara',113],['Badulla','Ratnapura',111],['Ratnapura','Galle',115]
    ];
    const routeTownCoordinates = {
        Peliyagoda: { lat: 6.959, lng: 79.880 },
        Wattala: { lat: 6.989, lng: 79.892 },
        JaEla: { lat: 7.075, lng: 79.891 },
        Seeduwa: { lat: 7.105, lng: 79.886 },
        Katunayake: { lat: 7.164, lng: 79.884 },
        Kuruwita: { lat: 6.783, lng: 80.367 },
        Eheliyagoda: { lat: 6.850, lng: 80.261 },
        Avissawella: { lat: 6.954, lng: 80.207 },
        Yatiyantota: { lat: 7.027, lng: 80.298 },
        Talduwa: { lat: 6.969, lng: 80.285 },
        Ruwanwella: { lat: 7.047, lng: 80.257 },
        Pugoda: { lat: 7.039, lng: 80.127 },
        Urapola: { lat: 7.112, lng: 80.139 },
        Nittambuwa: { lat: 7.143, lng: 80.096 },
        Pasyala: { lat: 7.192, lng: 80.126 },
        Ambepussa: { lat: 7.249, lng: 80.171 },
        Kekirawa: { lat: 8.040, lng: 80.600 },
        Vavuniya: { lat: 8.751, lng: 80.498 },
        Kilinochchi: { lat: 9.380, lng: 80.404 }
    };
    const routeTownLabels = {
        Peliyagoda: 'Peliyagoda',
        Wattala: 'Wattala',
        JaEla: 'Ja-Ela',
        Seeduwa: 'Seeduwa',
        Katunayake: 'Katunayake',
        Kadawatha: 'Kadawatha',
        Nittambuwa: 'Nittambuwa',
        Kegalle: 'Kegalle',
        Mawanella: 'Mawanella',
        Kadugannawa: 'Kadugannawa',
        Peradeniya: 'Peradeniya',
        Homagama: 'Homagama',
        Padukka: 'Padukka',
        Ingiriya: 'Ingiriya',
        Kuruwita: 'Kuruwita',
        Eheliyagoda: 'Eheliyagoda',
        Avissawella: 'Avissawella',
        Yatiyantota: 'Yatiyantota',
        Talduwa: 'Talduwa',
        Ruwanwella: 'Ruwanwella',
        Pugoda: 'Pugoda',
        Urapola: 'Urapola',
        Pasyala: 'Pasyala',
        Ambepussa: 'Ambepussa',
        Panadura: 'Panadura',
        Kalutara: 'Kalutara',
        Aluthgama: 'Aluthgama',
        Ambalangoda: 'Ambalangoda',
        Hikkaduwa: 'Hikkaduwa',
        Dankotuwa: 'Dankotuwa',
        Pannala: 'Pannala',
        Narammala: 'Narammala',
        Galewela: 'Galewela',
        Melsiripura: 'Melsiripura',
        Galgamuwa: 'Galgamuwa',
        Eppawala: 'Eppawala',
        Galagedara: 'Galagedara',
        Katugastota: 'Katugastota',
        Akurana: 'Akurana',
        Naula: 'Naula',
        Elahera: 'Elahera',
        Kekirawa: 'Kekirawa',
        Habarana: 'Habarana',
        Minneriya: 'Minneriya',
        Vavuniya: 'Vavuniya',
        Kilinochchi: 'Kilinochchi',
        Mihintale: 'Mihintale',
        Gampola: 'Gampola',
        Pussellawa: 'Pussellawa',
        Ramboda: 'Ramboda',
        Digana: 'Digana',
        Hunnasgiriya: 'Hunnasgiriya',
        Mahiyanganaya: 'Mahiyanganaya',
        Rideemaliyadda: 'Rideemaliyadda',
        Haputale: 'Haputale',
        Bandarawela: 'Bandarawela',
        Ella: 'Ella',
        Monaragala: 'Monaragala',
        Siyambalanduwa: 'Siyambalanduwa',
        Balangoda: 'Balangoda',
        Pelmadulla: 'Pelmadulla',
        Kalawana: 'Kalawana',
        Neluwa: 'Neluwa'
    };
    const roadGraph = {};
    roadEdges.forEach(([a,b,km]) => { roadGraph[a] ||= {}; roadGraph[b] ||= {}; roadGraph[a][b]=km; roadGraph[b][a]=km; });
    const roadTownRoutes = {
        'Colombo|Kandy': [['Colombo','Kadawatha',15],['Kadawatha','Nittambuwa',20],['Nittambuwa','Kegalle',25],['Kegalle','Mawanella',12],['Mawanella','Kadugannawa',18],['Kadugannawa','Peradeniya',15],['Peradeniya','Kandy',10]],
        'Colombo|Ratnapura': [['Colombo','Homagama',24],['Homagama','Padukka',15],['Padukka','Ingiriya',22],['Ingiriya','Kuruwita',27],['Kuruwita','Ratnapura',13]],
        'Colombo|Galle': [['Colombo','Panadura',27],['Panadura','Kalutara',15],['Kalutara','Aluthgama',20],['Aluthgama','Ambalangoda',25],['Ambalangoda','Hikkaduwa',20],['Hikkaduwa','Galle',12]],
        'Negombo|Kurunegala': [['Negombo','Dankotuwa',15],['Dankotuwa','Pannala',14],['Pannala','Narammala',16],['Narammala','Kurunegala',13]],
        'Kurunegala|Matale': [['Kurunegala','Galewela',32],['Galewela','Naula',17],['Naula','Matale',8]],
        'Kurunegala|Dambulla': [['Kurunegala','Melsiripura',25],['Melsiripura','Galewela',25],['Galewela','Dambulla',19]],
        'Kurunegala|Anuradhapura': [['Kurunegala','Galgamuwa',44],['Galgamuwa','Eppawala',40],['Eppawala','Anuradhapura',24]],
        'Kurunegala|Jaffna': [['Kurunegala','Dambulla',57],['Dambulla','Kekirawa',32],['Kekirawa','Anuradhapura',30],['Anuradhapura','Vavuniya',48],['Vavuniya','Kilinochchi',83],['Kilinochchi','Jaffna',53]],
        'Ratnapura|Kurunegala': [['Ratnapura','Kuruwita',13],['Kuruwita','Eheliyagoda',12],['Eheliyagoda','Avissawella',15],['Avissawella','Yatiyantota',15],['Yatiyantota','Talduwa',5],['Talduwa','Pugoda',25],['Pugoda','Urapola',6],['Urapola','Nittambuwa',7],['Nittambuwa','Pasyala',4],['Pasyala','Ambepussa',8],['Ambepussa','Kurunegala',12]],
        'Kurunegala|Kandy': [['Kurunegala','Galagedara',38],['Galagedara','Katugastota',27],['Katugastota','Kandy',6]],
        'Matale|Kandy': [['Matale','Akurana',16],['Akurana','Katugastota',8],['Katugastota','Kandy',2]],
        'Matale|Dambulla': [['Matale','Naula',17],['Naula','Dambulla',26]],
        'Matale|Polonnaruwa': [['Matale','Naula',17],['Naula','Elahera',35],['Elahera','Polonnaruwa',44]],
        'Dambulla|Anuradhapura': [['Dambulla','Kekirawa',31],['Kekirawa','Eppawala',25],['Eppawala','Anuradhapura',15]],
        'Dambulla|Polonnaruwa': [['Dambulla','Habarana',25],['Habarana','Minneriya',17],['Minneriya','Polonnaruwa',19]],
        'Dambulla|NuwaraEliya': [['Dambulla','Matale',43],['Matale','Kandy',26],['Kandy','Gampola',20],['Gampola','Ramboda',26],['Ramboda','NuwaraEliya',24]],
        'Anuradhapura|Jaffna': [['Anuradhapura','Vavuniya',63],['Vavuniya','Kilinochchi',93],['Kilinochchi','Jaffna',48]],
        'Anuradhapura|Polonnaruwa': [['Anuradhapura','Mihintale',15],['Mihintale','Kekirawa',40],['Kekirawa','Habarana',28],['Habarana','Polonnaruwa',25]],
        'Kandy|NuwaraEliya': [['Kandy','Gampola',20],['Gampola','Pussellawa',20],['Pussellawa','Ramboda',18],['Ramboda','NuwaraEliya',17]],
        'Kandy|Badulla': [['Kandy','Digana',20],['Digana','Hunnasgiriya',32],['Hunnasgiriya','Mahiyanganaya',40],['Mahiyanganaya','Rideemaliyadda',20],['Rideemaliyadda','Badulla',14]],
        'NuwaraEliya|Badulla': [['NuwaraEliya','Haputale',30],['Haputale','Bandarawela',20],['Bandarawela','Ella',16],['Ella','Badulla',11]],
        'Badulla|Ampara': [['Badulla','Monaragala',62],['Monaragala','Siyambalanduwa',32],['Siyambalanduwa','Ampara',19]],
        'Badulla|Ratnapura': [['Badulla','Haputale',26],['Haputale','Balangoda',45],['Balangoda','Pelmadulla',27],['Pelmadulla','Ratnapura',13]],
        'Ratnapura|Galle': [['Ratnapura','Kalawana',38],['Kalawana','Neluwa',48],['Neluwa','Galle',29]]
    };
    const OSRM_ROUTER_URL = 'https://router.project-osrm.org';
    const onlineRouteCache = new Map();
    const pendingOnlineRoutes = new Map();
    const onlineDistanceCache = new Map();
    let onlineDistanceTableSignature = null;
    let onlineDistanceTableError = null;
    let onlineDistanceRequestId = 0;
    let activeRouteRender = 0;

    function routeKey(from, to) {
        return JSON.stringify([from, to]);
    }

    async function getOnlineDrivingRoute(from, to) {
        const key = routeKey(from, to);
        if (onlineRouteCache.has(key)) return onlineRouteCache.get(key);
        if (pendingOnlineRoutes.has(key)) return pendingOnlineRoutes.get(key);

        const start = locations[from];
        const end = locations[to];
        if (!start || !end) throw new Error('The selected town is missing map coordinates.');

        const url = new URL(`${OSRM_ROUTER_URL}/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}`);
        url.searchParams.set('alternatives', 'true');
        url.searchParams.set('overview', 'full');
        url.searchParams.set('steps', 'true');
        url.searchParams.set('geometries', 'geojson');

        const request = fetch(url).then(async response => {
            if (!response.ok) throw new Error(`Routing service returned HTTP ${response.status}.`);
            const result = await response.json();
            if (result.code !== 'Ok' || !Array.isArray(result.routes) || result.routes.length === 0) {
                throw new Error(result.message || `Routing service returned ${result.code || 'no route'}.`);
            }

            const bestRoute = result.routes.reduce((best, candidate) =>
                candidate.distance < best.distance ? candidate : best
            );
            const coordinates = bestRoute.geometry?.coordinates;
            if (!Array.isArray(coordinates) || coordinates.length < 2) {
                throw new Error('Routing service returned an invalid road geometry.');
            }

            return {
                distanceKm: bestRoute.distance / 1000,
                coordinates: coordinates.map(([lng, lat]) => [lat, lng]),
                steps: (bestRoute.legs || []).flatMap(leg => leg.steps || [])
            };
        }).then(result => {
            onlineRouteCache.set(key, result);
            return result;
        }).finally(() => pendingOnlineRoutes.delete(key));

        pendingOnlineRoutes.set(key, request);
        return request;
    }

    async function loadOnlineDistanceTable() {
        const sourceLocations = Array.from(new Set(data.farmers.map(farmer => farmer.location)))
            .filter(location => locations[location]).sort();
        const destinationLocations = Array.from(new Set(data.buyers.map(buyer => buyer.location)))
            .filter(location => locations[location]).sort();
        if (!sourceLocations.length || !destinationLocations.length) return;

        const allLocations = Array.from(new Set([...sourceLocations, ...destinationLocations]));
        if (allLocations.length > 100) {
            onlineDistanceTableError = new Error('Too many towns for one online distance request.');
            onlineDistanceTableSignature = JSON.stringify([sourceLocations, destinationLocations]);
            return;
        }

        const signature = JSON.stringify([sourceLocations, destinationLocations]);
        if (signature === onlineDistanceTableSignature) return;
        onlineDistanceTableSignature = signature;
        onlineDistanceTableError = null;
        const requestId = ++onlineDistanceRequestId;

        const indices = new Map(allLocations.map((location, index) => [location, index]));
        const coordinates = allLocations.map(location => {
            const point = locations[location];
            return `${point.lng},${point.lat}`;
        }).join(';');
        const url = new URL(`${OSRM_ROUTER_URL}/table/v1/driving/${coordinates}`);
        url.searchParams.set('sources', sourceLocations.map(location => indices.get(location)).join(';'));
        url.searchParams.set('destinations', destinationLocations.map(location => indices.get(location)).join(';'));
        url.searchParams.set('annotations', 'distance');

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Distance service returned HTTP ${response.status}.`);
            const result = await response.json();
            if (requestId !== onlineDistanceRequestId) return;
            if (result.code !== 'Ok' || !Array.isArray(result.distances)) {
                throw new Error(result.message || `Distance service returned ${result.code || 'no distances'}.`);
            }

            for (let sourceIndex = 0; sourceIndex < sourceLocations.length; sourceIndex += 1) {
                const row = result.distances[sourceIndex];
                if (!Array.isArray(row) || row.length !== destinationLocations.length) {
                    throw new Error('Distance service returned an incomplete distance matrix.');
                }
                for (let destinationIndex = 0; destinationIndex < destinationLocations.length; destinationIndex += 1) {
                    const meters = row[destinationIndex];
                    if (Number.isFinite(meters)) {
                        onlineDistanceCache.set(routeKey(sourceLocations[sourceIndex], destinationLocations[destinationIndex]), meters / 1000);
                    }
                }
            }

            render();
        } catch (error) {
            if (requestId !== onlineDistanceRequestId) return;
            onlineDistanceTableError = error;
            console.error('OpenStreetMap distance lookup failed:', error);
            render();
        }
    }

    function dijkstra(graph, start) {
        const dist = {}, previous = {}, unseen = new Set(Object.keys(graph));
        Object.keys(graph).forEach(location => dist[location] = Infinity);
        if (!Object.hasOwn(graph, start)) return { dist, previous };
        dist[start] = 0;
        while (unseen.size) {
            let current = null;
            unseen.forEach(location => { if (current === null || dist[location] < dist[current]) current = location; });
            if (current === null || dist[current] === Infinity) break;
            unseen.delete(current);
            Object.entries(graph[current] || {}).forEach(([next, weight]) => {
                if (!unseen.has(next)) return;
                const alternative = dist[current] + weight;
                if (alternative < dist[next]) { dist[next] = alternative; previous[next] = current; }
            });
        }
        return { dist, previous };
    }

    function dijkstraRoute(from, to) {
        if (!roadGraph[from] || !roadGraph[to]) return { distance: Infinity, route: [] };
        const {dist, previous} = dijkstra(roadGraph, from);
        if (!Number.isFinite(dist[to])) return { distance: Infinity, route: [] };
        const route = []; let current = to;
        while (current) { route.unshift(current); if (current === from) break; current = previous[current]; }
        return { distance: dist[to], route };
    }

    function getTownRouteLegs(route) {
        return route.slice(0, -1).flatMap((from, index) => {
            const to = route[index + 1];
            const forwardRoute = roadTownRoutes[`${from}|${to}`];
            if (forwardRoute) {
                return forwardRoute.map(([legFrom, legTo, distance]) => ({ from: legFrom, to: legTo, distance }));
            }

            const reverseRoute = roadTownRoutes[`${to}|${from}`];
            if (reverseRoute) {
                return reverseRoute.slice().reverse().map(([legFrom, legTo, distance]) => ({
                    from: legTo,
                    to: legFrom,
                    distance
                }));
            }

            return [{ from, to, distance: roadGraph[from]?.[to] }];
        });
    }

    function distanceBetween(firstKey, secondKey) {
        const route = onlineRouteCache.get(routeKey(firstKey, secondKey));
        return route?.distanceKm ?? onlineDistanceCache.get(routeKey(firstKey, secondKey)) ?? dijkstraRoute(firstKey, secondKey).distance;
    }

    function getMatches() {
        const matches = [];
        for (const farmer of data.farmers) {
            for (const buyer of data.buyers) {
                if (farmer.product !== buyer.product || farmer.price > buyer.maxPrice) continue;
                const routeData = dijkstraRoute(farmer.location, buyer.location);
                const distance = distanceBetween(farmer.location, buyer.location);
                const priceFit = 100 - 50 * (farmer.price / buyer.maxPrice);
                const distanceFit = Math.max(0, 100 * (1 - distance / 500));
                const supplyCoverage = Math.min(1, farmer.quantity / buyer.quantity) * 100;
                const score = Math.round(priceFit * 0.35 + distanceFit * 0.45 + supplyCoverage * 0.20);
                matches.push({
                    farmer,
                    buyer,
                    distance,
                    route: routeData.route,
                    priceFit,
                    supplyCoverage,
                    score
                });
            }
        }
        return matches.sort((a, b) => b.score - a.score || a.distance - b.distance);
    }

    function getAllocations(matches) {
        const available = new Map(data.farmers.map(farmer => [farmer.id, Number(farmer.quantity)]));
        const remaining = new Map(data.buyers.map(buyer => [buyer.id, Number(buyer.quantity)]));
        const allocations = [];
        for (const match of matches) {
            const farmerRemaining = available.get(match.farmer.id) || 0;
            const buyerRemaining = remaining.get(match.buyer.id) || 0;
            const quantity = Math.min(farmerRemaining, buyerRemaining);
            if (quantity <= 0) continue;
            allocations.push({ ...match, quantity });
            available.set(match.farmer.id, farmerRemaining - quantity);
            remaining.set(match.buyer.id, buyerRemaining - quantity);
        }
        return {
            allocations,
            remaining,
            totalAllocated: allocations.reduce((sum, item) => sum + item.quantity, 0)
        };
    }

    function personCell(name, subtitle, buyer = false) {
        return `<div class="person-cell"><span class="mini-avatar ${buyer ? 'buyer' : ''}">${escapeHtml(initials(name))}</span><span><strong>${escapeHtml(name)}</strong><small>${escapeHtml(subtitle)}</small></span></div>`;
    }

    function scoreCell(score) {
        return `<div class="score-cell"><span class="score-track"><span class="score-fill" style="width:${score}%"></span></span><span class="score-number">${score}%</div>`;
    }

    function readLegacyData() {
        try {
            const saved = localStorage.getItem(LEGACY_STORAGE_KEY);
            if (!saved) return null;
            const parsed = JSON.parse(saved);
            if (!Array.isArray(parsed.farmers) || !Array.isArray(parsed.buyers)) {
                throw new Error('Saved browser data has an invalid shape.');
            }
            return parsed;
        } catch (error) {
            console.error('Unable to read existing browser data for migration:', error);
            showFirebaseNotice(`Existing browser data could not be imported: ${error.message}`);
            return null;
        }
    }

    function readLocalCache() {
        try {
            const saved = localStorage.getItem(LOCAL_CACHE_KEY);
            if (!saved) return null;
            const parsed = JSON.parse(saved);
            if (!Array.isArray(parsed.farmers) || !Array.isArray(parsed.buyers)) return null;
            parsed.farmers = consolidateFarmerRecords(parsed.farmers);
            return parsed;
        } catch (error) {
            console.warn('Unable to read CropLink local cache:', error);
            return null;
        }
    }

    function saveLocalCache() {
        try {
            localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify({
                farmers: data.farmers,
                buyers: data.buyers
            }));
        } catch (error) {
            console.warn('Unable to save CropLink local cache:', error);
        }
    }

    function getSignedOutData() {
        const cached = readLocalCache();
        if (cached) return cached;
        return {
            farmers: initialData.farmers.map(record => ({ ...record })),
            buyers: initialData.buyers.map(record => ({ ...record }))
        };
    }

    function renderNavigationCounts() {
        const farmers = byId('farmersNavCount');
        const buyers = byId('buyersNavCount');
        if (farmers) farmers.textContent = data.farmers.length;
        if (buyers) buyers.textContent = data.buyers.length;
    }

    function renderDashboard(matches) {
        const totalSupply = data.farmers.reduce((sum, farmer) => sum + Number(farmer.quantity), 0);
        const demandByProduct = data.buyers.reduce((counts, buyer) => {
            counts[buyer.product] = (counts[buyer.product] || 0) + Number(buyer.quantity);
            return counts;
        }, {});
        const demandEntries = Object.entries(demandByProduct).sort((a, b) => b[1] - a[1]);
        const maxDemand = Math.max(1, ...demandEntries.map(entry => entry[1]));

        if (byId('dashboardFarmerCount')) byId('dashboardFarmerCount').textContent = data.farmers.length;
        if (byId('dashboardBuyerCount')) byId('dashboardBuyerCount').textContent = data.buyers.length;
        if (byId('dashboardMatchCount')) byId('dashboardMatchCount').textContent = matches.length;
        if (byId('dashboardSupply')) byId('dashboardSupply').textContent = formatNumber(totalSupply);

        if (byId('demandList')) {
            byId('demandList').innerHTML = demandEntries.length
                ? demandEntries.map(([product, quantity]) => `<div><div class="demand-row-head"><span>${escapeHtml(product)}</span><span>${formatNumber(quantity)} kg</span></div><div class="progress-track"><div class="progress-fill" style="width:${Math.max(4, quantity / maxDemand * 100)}%"></div></div></div>`).join('')
                : '<p class="muted">No buyer requests have been added.</p>';
        }

        const table = byId('dashboardMatches');
        if (table) {
            table.innerHTML = matches.slice(0, 4).map(match => `<tr><td>${personCell(match.farmer.name, getLocationName(match.farmer.location))}</td><td><span class="crop-tag">${escapeHtml(match.farmer.product)}</span></td><td>${personCell(match.buyer.name, getLocationName(match.buyer.location), true)}</td><td>${formatNumber(Math.min(match.farmer.quantity, match.buyer.quantity))} kg</td><td>${Math.round(match.distance)} km</td><td>${scoreCell(match.score)}</td></tr>`).join('');
            if (!matches.length) table.innerHTML = '<tr><td colspan="6" class="empty-state">No eligible matches. Add compatible supply or demand.</td></tr>';
        }

        const canvas = byId('harvestChart');
        if (canvas && window.Chart) {
            const context = canvas.getContext('2d');
            if (harvestChart) harvestChart.destroy();
            harvestChart = new window.Chart(context, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Harvest Volume Trends (kg)',
                        data: [120, 190, 300, 250, 420, 500, 480, 390, 310, 280, 200, 150],
                        borderColor: '#10B981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        fill: true,
                        tension: 0.4,
                        pointRadius: 2.5,
                        pointHoverRadius: 5,
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { grid: { display: false }, ticks: { color: '#98a69e', font: { size: 9 } } },
                        y: { beginAtZero: true, grid: { color: '#eff3f0' }, ticks: { color: '#98a69e', font: { size: 9 }, maxTicksLimit: 5 } }
                    }
                }
            });
        } else if (canvas) {
            canvas.insertAdjacentHTML('afterend', '<p class="muted">Chart.js could not load. Check your internet connection.</p>');
        }

        const now = new Date();
        const hour = now.getHours();
        let greeting = 'Good night';
        if (hour >= 5 && hour < 12) greeting = 'Good morning';
        else if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
        else if (hour >= 17 && hour < 21) greeting = 'Good evening';

        if (byId('dashboardGreeting')) byId('dashboardGreeting').textContent = greeting;
        if (byId('dashboardDate')) {
            byId('dashboardDate').textContent = now.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            }).toUpperCase();
        }
    }

    function renderFarmers() {
        const search = (byId('farmerSearch')?.value || '').trim().toLowerCase();
        const filtered = data.farmers.filter(farmer => `${farmer.name} ${farmer.product} ${getLocationName(farmer.location)}`.toLowerCase().includes(search));
        const table = byId('farmersTable');
        if (table) {
            table.innerHTML = filtered.map(farmer => `<tr><td>${personCell(farmer.name, `Supplier · ${getLocationName(farmer.location)}`)}</td><td><span class="crop-tag">${escapeHtml(farmer.product)}</span></td><td><strong>${formatNumber(farmer.quantity)} kg</strong></td><td>${formatMoney(farmer.price)} / kg</td><td>${escapeHtml(getLocationName(farmer.location))}</td><td><span class="status-tag">Available</span></td></tr>`).join('');
            if (!filtered.length) table.innerHTML = `<tr><td colspan="6" class="empty-state">${search ? 'No farmers match your search.' : 'No farmers have been added.'}</td></tr>`;
        }
        const resultCount = byId('farmerResultCount');
        if (resultCount) resultCount.textContent = `Showing ${filtered.length} of ${data.farmers.length} farmers`;
        if (byId('farmersPageCount')) byId('farmersPageCount').textContent = data.farmers.length;
        if (byId('farmersPageSupply')) byId('farmersPageSupply').textContent = formatNumber(data.farmers.reduce((sum, farmer) => sum + Number(farmer.quantity), 0));
        if (byId('farmersCropCount')) byId('farmersCropCount').textContent = new Set(data.farmers.map(farmer => farmer.product)).size;
    }

    function renderBuyers() {
        const search = (byId('buyerSearch')?.value || '').trim().toLowerCase();
        const filtered = data.buyers.filter(buyer => `${buyer.name} ${buyer.product} ${getLocationName(buyer.location)}`.toLowerCase().includes(search));
        const table = byId('buyersTable');
        if (table) {
            table.innerHTML = filtered.map(buyer => `<tr><td>${personCell(buyer.name, `Buyer · ${getLocationName(buyer.location)}`, true)}</td><td><span class="crop-tag">${escapeHtml(buyer.product)}</span></td><td><strong>${formatNumber(buyer.quantity)} kg</strong></td><td>${formatMoney(buyer.maxPrice)} / kg</td><td>${escapeHtml(getLocationName(buyer.location))}</td><td><span class="status-tag">Open</span></td></tr>`).join('');
            if (!filtered.length) table.innerHTML = `<tr><td colspan="6" class="empty-state">${search ? 'No buyer requests match your search.' : 'No buyer requests have been added.'}</td></tr>`;
        }
        const totalDemand = data.buyers.reduce((sum, buyer) => sum + Number(buyer.quantity), 0);
        const averagePrice = data.buyers.length ? data.buyers.reduce((sum, buyer) => sum + Number(buyer.maxPrice), 0) / data.buyers.length : 0;
        if (byId('buyersPageCount')) byId('buyersPageCount').textContent = data.buyers.length;
        if (byId('buyersPageDemand')) byId('buyersPageDemand').textContent = formatNumber(totalDemand);
        if (byId('buyersAveragePrice')) byId('buyersAveragePrice').textContent = formatNumber(averagePrice);
    }

    function renderMatches(matches) {
        const search = (byId('matchSearch')?.value || '').trim().toLowerCase();
        const filtered = matches.filter(match => `${match.farmer.name} ${match.buyer.name} ${match.farmer.product}`.toLowerCase().includes(search));
        const table = byId('matchesTable');
        if (table) {
            table.innerHTML = filtered.map((match, index) => `<tr><td><strong>#${String(index + 1).padStart(2, '0')}</strong></td><td>${personCell(match.farmer.name, `to ${match.buyer.name}`)}</td><td><span class="crop-tag">${escapeHtml(match.farmer.product)}</span></td><td><span class="score-breakdown">${formatMoney(match.farmer.price)} / ${formatMoney(match.buyer.maxPrice)} max</span></td><td>${Math.round(match.distance)} km</td><td>${scoreCell(match.score)}</td></tr>`).join('');
            if (!filtered.length) table.innerHTML = '';
        }
        if (byId('noMatchesMessage')) byId('noMatchesMessage').classList.toggle('hidden', filtered.length > 0);
        if (byId('matchesPageCount')) byId('matchesPageCount').textContent = matches.length;
        if (byId('strongMatchesCount')) byId('strongMatchesCount').textContent = matches.filter(match => match.score >= 75).length;
        if (byId('matchedCropCount')) byId('matchedCropCount').textContent = new Set(matches.map(match => match.farmer.product)).size;
    }

    function renderAllocations(matches) {
        const { allocations, remaining, totalAllocated } = getAllocations(matches);
        const totalDemand = data.buyers.reduce((sum, buyer) => sum + Number(buyer.quantity), 0);
        const stillNeeded = Array.from(remaining.values()).reduce((sum, quantity) => sum + quantity, 0);
        const fulfilled = data.buyers.filter(buyer => (remaining.get(buyer.id) || 0) === 0).length;
        const table = byId('allocationsTable');
        if (table) {
            table.innerHTML = allocations.map(item => `<tr><td>${personCell(item.farmer.name, getLocationName(item.farmer.location))}</td><td><span class="crop-tag">${escapeHtml(item.farmer.product)}</span></td><td>${personCell(item.buyer.name, getLocationName(item.buyer.location), true)}</td><td class="allocation-cell">${formatNumber(item.quantity)} kg</td><td>${formatMoney(item.farmer.price)} / kg</td><td>${scoreCell(item.score)}</td></tr>`).join('');
        }
        if (byId('noAllocationsMessage')) byId('noAllocationsMessage').classList.toggle('hidden', allocations.length > 0);
        if (byId('allocatedQuantity')) byId('allocatedQuantity').textContent = formatNumber(totalAllocated);
        if (byId('unfilledQuantity')) byId('unfilledQuantity').textContent = formatNumber(stillNeeded);
        if (byId('fulfilledRequestCount')) byId('fulfilledRequestCount').textContent = `${fulfilled} / ${data.buyers.length}`;
        if (byId('allocatedPercent')) byId('allocatedPercent').textContent = `${totalDemand ? Math.round(totalAllocated / totalDemand * 100) : 0}% of total requested demand`;
    }

    let routeMap = null;
    let routeLayer = null;

    function getOnlineRouteLegs(routeData, from, to) {
        const coordinates = routeData.coordinates;
        const cumulativeKm = [0];
        const earthRadiusKm = 6371;
        for (let index = 1; index < coordinates.length; index += 1) {
            const [lat1, lng1] = coordinates[index - 1].map(value => value * Math.PI / 180);
            const [lat2, lng2] = coordinates[index].map(value => value * Math.PI / 180);
            const deltaLat = lat2 - lat1;
            const deltaLng = lng2 - lng1;
            const haversine = Math.sin(deltaLat / 2) ** 2
                + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) ** 2;
            cumulativeKm.push(cumulativeKm[index - 1] + 2 * earthRadiusKm * Math.asin(Math.sqrt(haversine)));
        }

        const geometryLengthKm = cumulativeKm[cumulativeKm.length - 1];
        const distanceScale = geometryLengthKm ? routeData.distanceKm / geometryLengthKm : 1;
        const knownTowns = { ...routeTownCoordinates, ...locations };
        const intermediateStops = [];
        for (const [locationKey, point] of Object.entries(knownTowns)) {
            if (locationKey === from || locationKey === to) continue;
            let closestIndex = -1;
            let closestDistanceKm = Infinity;
            for (let index = 0; index < coordinates.length; index += 1) {
                const deltaLatKm = (coordinates[index][0] - point.lat) * 111.32;
                const deltaLngKm = (coordinates[index][1] - point.lng) * 111.32 * Math.cos(point.lat * Math.PI / 180);
                const distanceKm = Math.hypot(deltaLatKm, deltaLngKm);
                if (distanceKm < closestDistanceKm) {
                    closestDistanceKm = distanceKm;
                    closestIndex = index;
                }
            }
            const positionKm = cumulativeKm[closestIndex] * distanceScale;
            if (closestDistanceKm <= 5 && positionKm > 2 && positionKm < routeData.distanceKm - 2) {
                intermediateStops.push({
                    locationKey,
                    positionKm,
                    coordinates: coordinates[closestIndex]
                });
            }
        }

        intermediateStops.sort((a, b) => a.positionKm - b.positionKm);
        const stops = [{
            locationKey: from,
            positionKm: 0,
            coordinates: coordinates[0]
        }];
        for (const stop of intermediateStops) {
            if (stop.positionKm - stops[stops.length - 1].positionKm >= 3
                && routeData.distanceKm - stop.positionKm >= 3) {
                stops.push(stop);
            }
        }
        stops.push({
            locationKey: to,
            positionKm: routeData.distanceKm,
            coordinates: coordinates[coordinates.length - 1]
        });

        const legs = stops.slice(0, -1).map((stop, index) => ({
            from: stop.locationKey,
            to: stops[index + 1].locationKey,
            distance: stops[index + 1].positionKm - stop.positionKm,
            fromCoordinates: stop.coordinates,
            toCoordinates: stops[index + 1].coordinates
        }));
        let displayedDistance = 0;
        return legs.map((leg, index) => {
            const distance = index === legs.length - 1
                ? Math.round(routeData.distanceKm) - displayedDistance
                : Math.round(leg.distance);
            displayedDistance += distance;
            return { ...leg, distance };
        });
    }

    function getOnlineRoadSegments(steps) {
        const segments = [];
        for (const step of steps) {
            const name = String(step.name || step.ref || '').trim();
            if (!name || step.distance < 100) continue;
            const previous = segments[segments.length - 1];
            if (previous && previous.name === name) previous.distance += step.distance / 1000;
            else segments.push({ name, distance: step.distance / 1000 });
        }
        return segments;
    }

    function drawOnlineRoute(match, routeData) {
        const routeLegs = byId('routeLegs');
        if (!routeMap || !routeLayer) return;

        window.L.polyline(routeData.coordinates, { color: '#15966a', weight: 5, opacity: 0.85 }).addTo(routeLayer);
        const legs = getOnlineRouteLegs(routeData, match.farmer.location, match.buyer.location);
        for (const [index, leg] of legs.entries()) {
            const isStart = index === 0;
            const isEnd = index === legs.length - 1;
            for (const [locationKey, coordinates, isEndpoint] of [
                [leg.from, leg.fromCoordinates, isStart],
                [leg.to, leg.toCoordinates, isEnd]
            ]) {
                if (!isEndpoint && index > 0 && locationKey === legs[index - 1].to) continue;
                window.L.circleMarker(coordinates, {
                    radius: isEndpoint ? 8 : 5,
                    color: '#ffffff',
                    weight: 2,
                    fillColor: locationKey === match.farmer.location ? '#08744e'
                        : locationKey === match.buyer.location ? '#e69c35' : '#15966a',
                    fillOpacity: 1
                }).bindTooltip(locationLabels[locationKey] || routeTownLabels[locationKey] || locationKey).addTo(routeLayer);
            }
        }

        routeMap.fitBounds(routeData.coordinates, { padding: [35, 35] });
        if (routeLegs) {
            const townLegs = legs.map(({ from, to, distance }) => {
                const fromName = locationLabels[from] || routeTownLabels[from] || from;
                const toName = locationLabels[to] || routeTownLabels[to] || to;
                return `<li><span>${escapeHtml(fromName)} → ${escapeHtml(toName)}</span><strong>${formatNumber(distance)} km</strong></li>`;
            }).join('');
            const roadSegments = getOnlineRoadSegments(routeData.steps).map(segment =>
                `<li><span>${escapeHtml(segment.name)}</span><strong>${formatNumber(segment.distance)} km</strong></li>`
            ).join('');
            const roadSegmentDetails = roadSegments
                ? `<details${legs.length <= 1 ? ' open' : ''}><summary>OpenStreetMap road segments</summary><ol class="route-itinerary-list">${roadSegments}</ol></details>`
                : '';
            const distanceNote = onlineDistanceTableError
                ? '<p class="route-itinerary-total">Online route comparison failed; other match distances may use local estimates.</p>'
                : '';
            routeLegs.innerHTML = `<ol class="route-itinerary-list">${townLegs}</ol>
                ${roadSegmentDetails}
                <p class="route-itinerary-total">Route distance: <strong>${formatNumber(routeData.distanceKm)} km</strong> · Shortest of the alternatives returned by the online driving router; it may not be the absolute minimum-distance route.</p>${distanceNote}`;
        }
        const routeMapStatus = byId('routeMapStatus');
        if (routeMapStatus) {
            routeMapStatus.textContent = `${getLocationName(match.farmer.location)} → ${getLocationName(match.buyer.location)} · ${formatNumber(routeData.distanceKm)} km · OSM road route`;
        }
    }

    function renderRouteMap(matches) {
        const mapElement = byId('routeMap');
        if (!mapElement || !window.L) return;
        if (!routeMap) {
            routeMap = window.L.map('routeMap').setView([7.87, 80.65], 7);
            window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(routeMap);
        }

        const select = byId('routeMapMatchSelect');
        const visibleMatches = matches;
        const selectedValue = select?.value || '';
        const optionValue = match => routeKey(match.farmer.id, match.buyer.id);
        if (select) {
            select.innerHTML = '<option value="">Select a match</option>' + visibleMatches.map(match =>
                `<option value="${escapeHtml(optionValue(match))}">${escapeHtml(match.farmer.name)} → ${escapeHtml(match.buyer.name)} (${Math.round(match.distance)} km)</option>`
            ).join('');
            if (visibleMatches.some(match => optionValue(match) === selectedValue)) select.value = selectedValue;
            else if (visibleMatches[0]) select.value = optionValue(visibleMatches[0]);
            else if (visibleMatches[0]) select.value = optionValue(visibleMatches[0]);
        }

        if (routeLayer) routeMap.removeLayer(routeLayer);
        routeLayer = window.L.layerGroup().addTo(routeMap);

        const match = visibleMatches.find(item => optionValue(item) === select?.value) || visibleMatches[0];
        if (!match) {
            activeRouteRender += 1;
            routeMap.setView([7.87, 80.65], 7);
            if (byId('routeMapStatus')) byId('routeMapStatus').textContent = 'No eligible route is available.';
            if (byId('routeLegs')) byId('routeLegs').textContent = 'Select a match to load its online road route.';
            if (byId('routeItemSummary')) byId('routeItemSummary').textContent = 'Select a match to see quantity and price estimates.';
            return;
        }

        const routeLegs = byId('routeLegs');
        const routeMapStatus = byId('routeMapStatus');
        const requestId = ++activeRouteRender;
        const selectedRoute = onlineRouteCache.get(routeKey(match.farmer.location, match.buyer.location));
        if (selectedRoute) drawOnlineRoute(match, selectedRoute);
        else {
            if (routeMapStatus) routeMapStatus.textContent = `${getLocationName(match.farmer.location)} → ${getLocationName(match.buyer.location)} · Loading online road route…`;
            if (routeLegs) routeLegs.textContent = 'Loading road geometry and route details from OpenStreetMap routing…';
            getOnlineDrivingRoute(match.farmer.location, match.buyer.location).then(() => {
                if (requestId === activeRouteRender) render();
            }).catch(error => {
                if (requestId !== activeRouteRender) return;
                console.error('OpenStreetMap route lookup failed:', error);
                if (routeMapStatus) routeMapStatus.textContent = `Unable to load online route: ${error.message}`;
                if (routeLegs) routeLegs.textContent = `The online road route could not be loaded: ${error.message}`;
            });
        }
        const matchedQuantity = Math.min(Number(match.farmer.quantity), Number(match.buyer.quantity));
        const farmerTotal = matchedQuantity * Number(match.farmer.price);
        const buyerMaximumTotal = matchedQuantity * Number(match.buyer.maxPrice);
        const routeItemSummary = byId('routeItemSummary');
        if (routeItemSummary) {
            routeItemSummary.innerHTML = `
                <div class="route-item-summary-grid">
                    <div><span>Item</span><strong>${escapeHtml(match.farmer.product)}</strong></div>
                    <div><span>Matched quantity</span><strong>${formatNumber(matchedQuantity)} kg</strong></div>
                    <div><span>Farmer price</span><strong>${formatMoney(match.farmer.price)} / kg</strong></div>
                    <div><span>Estimated total cost</span><strong>${formatMoney(farmerTotal)}</strong></div>
                    <div><span>Buyer maximum total</span><strong>${formatMoney(buyerMaximumTotal)}</strong></div>
                    <div><span>Below buyer maximum</span><strong>${formatMoney(buyerMaximumTotal - farmerTotal)}</strong></div>
                </div>
                <p class="route-item-summary-note">Calculated for the smaller of available supply and requested quantity.</p>`;
        }
    }

    function fillLocationSelects() {
        document.querySelectorAll('select[name="location"]').forEach(select => {
            for (const [key, label] of Object.entries(locationLabels)) {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = label;
                select.append(option);
            }
        });
    }

    function normalizeFarmerValue(value) {
        return String(value).trim().replace(/\s+/g, ' ').toLowerCase();
    }

    function farmerIdentity(record) {
        return JSON.stringify([
            normalizeFarmerValue(record.name),
            normalizeFarmerValue(record.product)
        ]);
    }

    function sumDistinctFarmerQuantities(records) {
        return Array.from(new Set(records.map(record => Number(record.quantity))))
            .reduce((total, quantity) => total + quantity, 0);
    }

    function consolidateFarmerRecords(records) {
        const consolidated = new Map();
        const seenQuantities = new Map();
        records.forEach(record => {
            const identity = farmerIdentity(record);
            const quantity = Number(record.quantity);
            const existing = consolidated.get(identity);
            if (existing) {
                const quantities = seenQuantities.get(identity);
                if (!quantities.has(quantity)) {
                    existing.quantity += quantity;
                    quantities.add(quantity);
                }
            } else {
                consolidated.set(identity, { ...record, quantity });
                seenQuantities.set(identity, new Set([quantity]));
            }
        });
        return Array.from(consolidated.values());
    }

    async function mergeDuplicateFarmerDocuments(records, ownerUid) {
        const groups = new Map();
        records.forEach(record => {
            const identity = farmerIdentity(record);
            const group = groups.get(identity) || [];
            group.push(record);
            groups.set(identity, group);
        });

        for (const duplicates of groups.values()) {
            if (duplicates.length < 2) continue;
            const refs = duplicates.map(record => doc(db, 'farmers', record.id));
            await runTransaction(db, async transaction => {
                const snapshots = await Promise.all(refs.map(ref => transaction.get(ref)));
                const existing = snapshots.filter(snapshot => snapshot.exists());
                if (existing.length < 2) return;

                const recordsToMerge = existing.map(snapshot => snapshot.data());
                if (recordsToMerge.some(record => record.ownerUid !== ownerUid
                    || farmerIdentity(record) !== farmerIdentity(recordsToMerge[0]))) {
                    throw new Error('Duplicate farmer records could not be matched safely.');
                }

                const totalQuantity = sumDistinctFarmerQuantities(recordsToMerge);
                if (!Number.isFinite(totalQuantity)) {
                    throw new Error('Duplicate farmer records contain an invalid quantity.');
                }
                transaction.update(existing[0].ref, { quantity: totalQuantity });
                existing.slice(1).forEach(snapshot => transaction.delete(snapshot.ref));
            });
        }
    }

    async function addFarmerSupply(record, ownerUid) {
        const farmerCollection = collection(db, 'farmers');
        const existingRecords = await getDocs(query(
            farmerCollection,
            where('ownerUid', '==', ownerUid)
        ));
        const nameKey = normalizeFarmerValue(record.name);
        const productKey = normalizeFarmerValue(record.product);
        const matchingRecords = existingRecords.docs.filter(snapshot => {
            const existing = snapshot.data();
            return normalizeFarmerValue(existing.name) === nameKey
                && normalizeFarmerValue(existing.product) === productKey;
        });
        const fallbackRef = doc(db, 'farmers', `aggregate-${encodeURIComponent(nameKey)}-${encodeURIComponent(productKey)}`);
        const refsById = new Map(matchingRecords.map(snapshot => [snapshot.id, snapshot.ref]));
        refsById.set(fallbackRef.id, fallbackRef);
        const matchingIds = new Set(matchingRecords.map(snapshot => snapshot.id));

        await runTransaction(db, async transaction => {
            const snapshots = await Promise.all(Array.from(refsById.values(), ref => transaction.get(ref)));
            const existingMatches = snapshots.filter(snapshot => snapshot.exists() && matchingIds.has(snapshot.id));
            if (existingMatches.length) {
                const recordsToMerge = existingMatches.map(snapshot => snapshot.data());
                if (recordsToMerge.some(existing => existing.ownerUid !== ownerUid
                    || normalizeFarmerValue(existing.name) !== nameKey
                    || normalizeFarmerValue(existing.product) !== productKey)) {
                    throw new Error('The farmer record could not be matched safely. Please try again.');
                }

                const primary = existingMatches[0];
                if (existingMatches.length === 1) {
                    transaction.update(primary.ref, { quantity: increment(record.quantity) });
                } else {
                    const totalQuantity = sumDistinctFarmerQuantities(recordsToMerge) + record.quantity;
                    if (!Number.isFinite(totalQuantity)) {
                        throw new Error('Farmer records contain an invalid quantity.');
                    }
                    transaction.update(primary.ref, { quantity: totalQuantity });
                    existingMatches.slice(1).forEach(snapshot => transaction.delete(snapshot.ref));
                }
                return;
            }

            const fallbackSnapshot = snapshots.find(snapshot => snapshot.id === fallbackRef.id);
            if (fallbackSnapshot?.exists()) {
                const existing = fallbackSnapshot.data();
                if (existing.ownerUid !== ownerUid
                    || normalizeFarmerValue(existing.name) !== nameKey
                    || normalizeFarmerValue(existing.product) !== productKey) {
                    throw new Error('The farmer record could not be matched safely. Please try again.');
                }
                transaction.update(fallbackRef, { quantity: increment(record.quantity) });
                return;
            }

            transaction.set(fallbackRef, { ...record, ownerUid, createdAt: serverTimestamp() });
        });
    }

    async function addRecord(type, form) {
        const formData = new FormData(form);
        const errorElement = byId(`${type}FormError`);
        const record = {
            name: String(formData.get('name')).trim(),
            product: String(formData.get('product')),
            quantity: Number(formData.get('quantity')),
            location: String(formData.get('location'))
        };
        if (type === 'farmer') record.price = Number(formData.get('price'));
        else record.maxPrice = Number(formData.get('maxPrice'));

        if (!record.name || !record.product || !record.location || !Number.isFinite(record.quantity) || record.quantity <= 0
            || !Number.isFinite(type === 'farmer' ? record.price : record.maxPrice)
            || (type === 'farmer' ? record.price : record.maxPrice) <= 0) {
            errorElement.textContent = 'Enter a name, product, location, and positive quantity and price.';
            return;
        }

        if (!currentUser) {
            errorElement.textContent = 'Sign in before saving records.';
            return;
        }

        const ownerUid = currentUser.uid;
        try {
            if (type === 'farmer') {
                await addFarmerSupply(record, ownerUid);
            } else {
                await addDoc(collection(db, 'buyerRequests'), {
                    ...record,
                    ownerUid,
                    createdAt: serverTimestamp()
                });
            }
            errorElement.textContent = '';
            form.reset();
            form.closest('dialog').close();
        } catch (error) {
            console.error(`Unable to save ${type} record:`, error);
            errorElement.textContent = `Could not save this record: ${error.message}`;
        }
    }

    async function seedCollectionIfEmpty(collectionName, records, user) {
        const ownerQuery = query(
            collection(db, collectionName),
            where('ownerUid', '==', user.uid)
        );
        const existingRecords = await getDocs(ownerQuery);
        if (!existingRecords.empty) return;

        const batch = writeBatch(db);
        records.forEach((record, index) => {
            const { id, ...fields } = record;
            batch.set(doc(db, collectionName, `sample-${user.uid}-${index + 1}`), {
                ...fields,
                ownerUid: user.uid,
                createdAt: serverTimestamp()
            });
        });
        await batch.commit();
    }

    async function seedDemoData(user) {
        const legacyData = readLegacyData();
        await seedCollectionIfEmpty('farmers', legacyData?.farmers || initialData.farmers, user);
        await seedCollectionIfEmpty('buyerRequests', legacyData?.buyers || initialData.buyers, user);
    }

    function showFirebaseNotice(message) {
        let notice = byId('firebaseNotice');
        if (!notice) {
            notice = document.createElement('p');
            notice.id = 'firebaseNotice';
            notice.className = 'firebase-notice';
            document.querySelector('.page-content')?.prepend(notice);
        }
        if (notice) notice.textContent = message;
    }

    function stopRecordListeners() {
        if (unsubscribeFarmers) unsubscribeFarmers();
        if (unsubscribeBuyers) unsubscribeBuyers();
        unsubscribeFarmers = null;
        unsubscribeBuyers = null;
        data = { farmers: [], buyers: [] };
    }

    function subscribeToRecords(user) {
        const farmersQuery = query(
            collection(db, 'farmers'),
            where('ownerUid', '==', user.uid)
        );
        const buyersQuery = query(
            collection(db, 'buyerRequests'),
            where('ownerUid', '==', user.uid)
        );

        unsubscribeFarmers = onSnapshot(farmersQuery, snapshot => {
            const farmerRecords = snapshot.docs.map(record => ({
                ...record.data(),
                id: record.id
            }));
            data.farmers = consolidateFarmerRecords(farmerRecords);
            saveLocalCache();
            render();
            mergeDuplicateFarmerDocuments(farmerRecords, user.uid).catch(error => {
                console.error('Unable to merge duplicate farmer records:', error);
                showFirebaseNotice(`Could not merge duplicate farmer records: ${error.message}`);
            });
        }, error => {
            console.error('Unable to load farmers from Firestore:', error);
            showFirebaseNotice(`Could not load farmers: ${error.message}`);
        });

        unsubscribeBuyers = onSnapshot(buyersQuery, snapshot => {
            data.buyers = snapshot.docs.map(record => ({
                ...record.data(),
                id: record.id
            }));
            saveLocalCache();
            render();
        }, error => {
            console.error('Unable to load buyer requests from Firestore:', error);
            showFirebaseNotice(`Could not load buyer requests: ${error.message}`);
        });
    }

    function updateProfileRole(role) {
        const allowedRoles = ['Coordinator', 'Farmer', 'Buyer'];
        const safeRole = allowedRoles.includes(role) ? role : 'Coordinator';
        document.querySelectorAll('.user-profile small').forEach(element => {
            element.textContent = safeRole;
        });
        document.querySelectorAll('.profile-menu-role').forEach(element => {
            element.textContent = safeRole;
        });
    }

    function setupAuthUI() {
        const authGate = document.createElement('section');
        authGate.id = 'authGate';
        authGate.className = 'auth-gate';
        authGate.innerHTML = `
            <form id="authForm" class="auth-card">
                <button type="button" class="auth-close" aria-label="Close sign-in">×</button>
                <span class="brand-mark auth-logo">C</span>
                <p class="eyebrow">CROPLINK WORKSPACE</p>
                <h1>Sign in to your workspace</h1>
                <p class="muted">Select your role and use your Firebase account.</p>
                <label>Login as
                    <select name="role" required>
                        <option value="Coordinator">Coordinator</option>
                        <option value="Farmer">Farmer</option>
                        <option value="Buyer">Buyer</option>
                    </select>
                </label>
                <label>Email address<input name="email" type="email" autocomplete="username" placeholder="name@example.com" required></label>
                <label>Password
                    <span class="password-field"><input name="password" type="password" autocomplete="current-password" placeholder="Enter your password" required><button type="button" class="password-toggle" aria-label="Show password">Show</button></span>
                </label>
                <p id="authError" class="form-error" role="alert"></p>
                <button class="button button-primary auth-submit" type="submit">Sign in</button>
            </form>`;
        document.body.append(authGate);

        document.querySelectorAll('.topbar-actions').forEach(actions => {
            const signOutButton = document.createElement('button');
            signOutButton.id = 'signOutButton';
            signOutButton.className = 'button button-quiet sign-out-button';
            signOutButton.type = 'button';
            signOutButton.textContent = 'Sign out';
            actions.append(signOutButton);
        });

        const passwordToggle = document.querySelector('.password-toggle');
        passwordToggle?.addEventListener('click', () => {
            const passwordInput = byId('authForm')?.querySelector('[name="password"]');
            if (!passwordInput) return;
            const showPassword = passwordInput.type === 'password';
            passwordInput.type = showPassword ? 'text' : 'password';
            passwordToggle.textContent = showPassword ? 'Hide' : 'Show';
            passwordToggle.setAttribute('aria-label', showPassword ? 'Hide password' : 'Show password');
        });

        byId('authForm').addEventListener('submit', async event => {
            event.preventDefault();
            const form = event.currentTarget;
            const button = form.querySelector('button[type="submit"]');
            const errorElement = byId('authError');
            const role = String(new FormData(form).get('role') || 'Coordinator');
            errorElement.textContent = '';
            button.disabled = true;
            try {
                await signInWithEmailAndPassword(
                    auth,
                    String(new FormData(form).get('email')).trim(),
                    String(new FormData(form).get('password'))
                );
                localStorage.setItem('croplink-login-role', role);
                updateProfileRole(role);
                form.reset();
            } catch (error) {
                console.error('Firebase sign-in failed:', error);
                errorElement.textContent = `Sign-in failed: ${error.message}`;
            } finally {
                button.disabled = false;
            }
        });

        byId('signOutButton').addEventListener('click', async () => {
            try {
                await performSignOut();
            } catch (error) {
                console.error('Firebase sign-out failed:', error);
                showFirebaseNotice(`Could not sign out: ${error.message}`);
            }
        });

        const authClose = document.querySelector('.auth-close');
        authClose?.addEventListener('click', () => {
            authGate.hidden = true;
        });
    }

    function setupProfileMenu() {
        document.querySelectorAll('.user-profile').forEach(profile => {
            const button = profile.querySelector('.profile-dots');
            if (!button) return;

            let menu = profile.querySelector('.profile-menu');
            if (!menu) {
                menu = document.createElement('div');
                menu.className = 'profile-menu';
                menu.innerHTML = `
                    <strong>Switch login</strong>
                    <small class="profile-menu-role">${localStorage.getItem('croplink-login-role') || 'Coordinator'}</small>
                    <button type="button" class="profile-role-switch" data-role="Coordinator">Coordinator</button>
                    <button type="button" class="profile-role-switch" data-role="Farmer">Farmer</button>
                    <button type="button" class="profile-role-switch" data-role="Buyer">Buyer</button>
                    <button type="button" class="profile-menu-signout">Sign out</button>`;
                profile.append(menu);
            }

            button.addEventListener('click', event => {
                event.stopPropagation();
                const open = menu.classList.toggle('open');
                button.setAttribute('aria-expanded', String(open));
            });

            menu.querySelector('.profile-menu-signout').addEventListener('click', async () => {
                try {
                    await performSignOut();
                } catch (error) {
                    showFirebaseNotice(`Could not sign out: ${error.message}`);
                }
            });

            menu.querySelectorAll('.profile-role-switch').forEach(switchButton => {
                switchButton.addEventListener('click', async () => {
                    const role = switchButton.dataset.role;
                    try {
                        await signOut(auth);
                        localStorage.setItem('croplink-login-role', role);
                        updateProfileRole(role);
                        const roleSelect = byId('authForm')?.querySelector('[name="role"]');
                        if (roleSelect) roleSelect.value = role;
                        if (byId('authGate')) byId('authGate').hidden = false;
                        menu.classList.remove('open');
                    } catch (error) {
                        showFirebaseNotice(`Could not switch role: ${error.message}`);
                    }
                });
            });
        });

        document.addEventListener('click', event => {
            if (!event.target.closest('.user-profile')) {
                document.querySelectorAll('.profile-menu.open').forEach(menu => menu.classList.remove('open'));
                document.querySelectorAll('.profile-dots').forEach(button => button.setAttribute('aria-expanded', 'false'));
            }
        });

        let startX = 0;
        document.querySelectorAll('.user-profile').forEach(profile => {
            profile.addEventListener('touchstart', event => { startX = event.changedTouches[0].clientX; }, { passive: true });
            profile.addEventListener('touchend', event => {
                const distance = event.changedTouches[0].clientX - startX;
                if (Math.abs(distance) < 35) return;
                const menu = profile.querySelector('.profile-menu');
                const open = distance < 0;
                menu?.classList.toggle('open', open);
                profile.querySelector('.profile-dots')?.setAttribute('aria-expanded', String(open));
            }, { passive: true });
        });
    }

    function startAuthListener() {
        onAuthStateChanged(auth, async user => {
            stopRecordListeners();
            currentUser = user;
            byId('authGate').hidden = Boolean(user);
            const status = document.querySelector('.status-pill');

            if (!user) {
                if (status) status.innerHTML = '<i></i> Sign-in required';
                const signedOutData = getSignedOutData();
                data = signedOutData;
                render();
                return;
            }

            if (status) status.innerHTML = '<i></i> Firebase connected';
            try {
                await seedDemoData(user);
                subscribeToRecords(user);
            } catch (error) {
                console.error('Unable to initialize CropLink Firestore data:', error);
                showFirebaseNotice(`Firestore setup failed: ${error.message}. Check that your Firestore rules allow this signed-in user.`);
            }
        }, error => {
            console.error('Firebase authentication state failed:', error);
            showFirebaseNotice(`Authentication error: ${error.message}`);
        });
    }

    function bindEvents() {
        byId('farmerSearch')?.addEventListener('input', renderFarmers);
        byId('buyerSearch')?.addEventListener('input', renderBuyers);
        byId('matchSearch')?.addEventListener('input', () => renderMatches(getMatches()));

        byId('addFarmerButton')?.addEventListener('click', () => byId('farmerDialog').showModal());
        byId('addBuyerButton')?.addEventListener('click', () => byId('buyerDialog').showModal());
        byId('farmerForm')?.addEventListener('submit', event => {
            event.preventDefault();
            addRecord('farmer', event.currentTarget);
        });
        byId('buyerForm')?.addEventListener('submit', event => {
            event.preventDefault();
            addRecord('buyer', event.currentTarget);
        });
        document.querySelectorAll('[data-close-dialog]').forEach(button => {
            button.addEventListener('click', () => button.closest('dialog').close());
        });
        byId('refreshMatches')?.addEventListener('click', () => {
            onlineDistanceTableSignature = null;
            render();
        });
        byId('runAllocation')?.addEventListener('click', () => {
            renderAllocations(getMatches());
            const label = byId('allocationResultLabel');
            if (label) label.textContent = `Updated ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        });
        byId('routeMapMatchSelect')?.addEventListener('change', () => renderRouteMap(getMatches()));
    }

    function render() {
        data.farmers = consolidateFarmerRecords(data.farmers);
        const matches = getMatches();
        renderNavigationCounts();
        renderDashboard(matches);
        renderFarmers();
        renderBuyers();
        renderMatches(matches);
        renderAllocations(matches);
        renderRouteMap(matches);
        if (byId('routeMapMatchSelect') && matches.length) loadOnlineDistanceTable();
    }

    updateProfileRole(localStorage.getItem('croplink-login-role') || 'Coordinator');
    fillLocationSelects();
    bindEvents();
    setupAuthUI();
    setupProfileMenu();
    setupNotificationMenu();
    setupSupportAgent();
    render();
    startAuthListener();

    async function performSignOut() {
        await signOut(auth);
        localStorage.removeItem('croplink-login-role');
        updateProfileRole('Coordinator');
        stopRecordListeners();
        currentUser = null;
        data = getSignedOutData();
        const authGate = byId('authGate');
        if (authGate) authGate.removeAttribute('hidden');
        const status = document.querySelector('.status-pill');
        if (status) status.innerHTML = '<i></i> Sign-in required';
        document.querySelectorAll('.profile-menu.open').forEach(menu => menu.classList.remove('open'));
        render();
    }

    function setupNotificationMenu() {
        document.querySelectorAll('.topbar-actions').forEach(actions => {
            const button = actions.querySelector('.icon-button');
            if (!button) return;

            button.innerHTML = '♧';
            button.setAttribute('aria-haspopup', 'menu');

            let menu = actions.querySelector('.notification-menu');
            if (!menu) {
                menu = document.createElement('div');
                menu.className = 'notification-menu';
                menu.setAttribute('role', 'menu');
                menu.innerHTML = `
                    <div class="notification-heading"><strong>Notifications</strong><span id="notificationCount">0</span></div>
                    <div class="notification-item"><span>♧</span><div><strong>Network status</strong><small>No new activity</small></div></div>`;
                actions.append(menu);
            }

            button.addEventListener('click', event => {
                event.stopPropagation();
                document.querySelectorAll('.notification-menu.open').forEach(openMenu => {
                    if (openMenu !== menu) openMenu.classList.remove('open');
                });
                const open = menu.classList.toggle('open');
                button.setAttribute('aria-expanded', String(open));

                const count = matchesForNotifications();
                const countElement = menu.querySelector('#notificationCount');
                if (countElement) countElement.textContent = String(count);
                const itemText = menu.querySelector('.notification-item small');
                if (itemText) itemText.textContent = count
                    ? `${count} smart matches available`
                    : 'No new activity';
            });
        });

        document.addEventListener('click', event => {
            if (!event.target.closest('.topbar-actions')) {
                document.querySelectorAll('.notification-menu.open').forEach(menu => menu.classList.remove('open'));
                document.querySelectorAll('.icon-button').forEach(button => button.setAttribute('aria-expanded', 'false'));
            }
        });
    }

    function matchesForNotifications() {
        return getMatches().length;
    }
})();

function setupSupportAgent() {
    const escapeChatHtml = value => String(value).replace(/[&<>"']/g, char => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[char]));
    const knowledge = {
        sinhala: {
            greeting: ['හෙලෝ','හායි','සුබ','ආයුබෝවන්'], farmer: ['ගොවියා','ගොවි','විකුණු','අලෙවි','ගොවියන්'], buyer: ['ගැණුම්කරු','ගන්න','ගැනුම්','මිලදී'], match: ['ගැලපු','ලකුණු','ස්මාර්ට්'], allocation: ['allocation','බෙදා','බෙද','ප්‍රමාණ'], signin: ['ලොගින්','sign in','පුර','password','මුරපද'], error: ['error','දෝෂ','save','සුරකි','firestore','firebase']
        },
        singlish: {
            greeting: ['hello','hi','ayubowan','kohomada'], farmer: ['goviya','govi','farmer','supplier','wikun'], buyer: ['buyer','ganumkaru','ganna','demand','miiladi'], match: ['match','gelapu','score','smart'], allocation: ['allocation','bada','beda','pramana','kotasa'], signin: ['login','sign in','signin','password','murapada'], error: ['error','dosha','save','sura','firebase','firestore']
        },
        english: {
            greeting: ['hello','hi','hey','good morning'], farmer: ['farmer','supplier','sell','add','produce'], buyer: ['buyer','demand','purchase','request','buy'], match: ['match','score','compatible','smart'], allocation: ['allocation','allocate','quantity','distribution'], signin: ['login','sign in','signin','password','account'], error: ['error','save','firebase','firestore','permission','rules']
        }
    };
    const answers = {
        sinhala: {
            greeting:'ආයුබෝවන්! ගොවීන්, ගැණුම්කරුවන්, matching, allocation සහ sign-in ගැන මගෙන් අසන්න පුළුවන්.', farmer:'ගොවියෙකු එකතු කිරීමට “Add farmer” click කර නම, crop, quantity (kg), asking price සහ location ඇතුළත් කර “Save farmer” click කරන්න.', buyer:'Buyer එකතු කිරීමට Buyers/Demand page එකේ “Add buyer” click කර නම, crop, quantity, maximum price සහ location ඇතුළත් කරන්න.', match:'Smart matching වලදී crop, quantity coverage, price fit සහ travel distance බලයි. Score එක වැඩි නම් match එක වඩා හොඳයි.', allocation:'Allocations page එකේ “Run allocation” click කරන්න. හොඳම matches අනුව supply distribute කර quantity oversell වීම වැළකෙයි.', signin:'Firebase Authentication account එකේ email සහ password යොදා sign in වෙන්න. Role එක Coordinator, Farmer හෝ Buyer ලෙස තෝරන්න.', error:'Record save කිරීමට sign in වී සිටිය යුතුයි. Firebase Authentication enable කර Firestore rules වල signed-in user ට read/write permissions තිබේද බලන්න.'
        },
        singlish: {
            greeting:'Ayubowan! Farmers, buyers, matching, allocation saha sign-in gena mama help karanna puluwan.', farmer:'Farmer kenek add karanna “Add farmer” button click karala name, crop, quantity (kg), asking price saha location dala “Save farmer” click karanna.', buyer:'Buyer kenek add karanna Buyers/Demand page eke “Add buyer” click karala name, crop, quantity, maximum price saha location enter karanna.', match:'Smart matching eke crop, quantity coverage, price fit saha travel distance balala score eka hadanawa. Score wadi nam match eka hodai.', allocation:'Allocations page eke “Run allocation” click karanna. Ranked matches walata supply distribute wela quantity oversell wenne naha.', signin:'Firebase Authentication account eke email saha password dala sign in wenna. Role eka Coordinator, Farmer, or Buyer lesa select karanna.', error:'Record save karanna sign in wela tiyanawan witharai. Firebase Authentication enable karala Firestore rules signed-in user ta read/write permission dennawada kiyala balanna.'
        },
        english: {
            greeting:'Hello! I can help with farmers, buyers, matching, allocations, and sign-in.', farmer:'To add a farmer, click “Add farmer”, enter the farmer name, crop, quantity, asking price, and location, then click “Save farmer”.', buyer:'To add a buyer, open the Buyer demand page and click “Add buyer”. Enter the buyer name, crop, quantity, maximum price, and location.', match:'Smart matching considers crop fit, price fit, quantity coverage, and travel distance. A higher score indicates a better match.', allocation:'Open Allocations and click “Run allocation”. Supply is distributed by ranked matches without overselling quantities.', signin:'Sign in with a Firebase Authentication account and choose Coordinator, Farmer, or Buyer in the login role section.', error:'Saving requires sign-in. Verify that Firebase Authentication is enabled and that Firestore rules allow the signed-in user to read and write records.'
        }
    };

    const panel = document.createElement('section');
    panel.className = 'support-agent';
    panel.setAttribute('aria-label', 'CropLink support assistant');
    panel.innerHTML = `
        <header class="support-agent-header"><div><span class="support-agent-status"></span><strong>CropLink Assistant</strong><small>AI support</small></div><button type="button" class="support-agent-close" aria-label="Close assistant">×</button></header>
        <div class="support-agent-messages" aria-live="polite"><div class="support-message agent"><span>Hello! Ask me about farmers, buyers, matching, allocations, or sign-in.</span></div></div>
        <div class="support-suggestions"><button type="button">How do I add a farmer?</button><button type="button">How are matches calculated?</button></div>
        <form class="support-agent-form"><input name="message" type="text" autocomplete="off" placeholder="Ask a question…" aria-label="Ask a question" required><button type="submit" aria-label="Send message">➤</button></form>`;
    document.body.append(panel);

    const trigger = document.querySelector('.help-card');
    const close = panel.querySelector('.support-agent-close');
    const form = panel.querySelector('.support-agent-form');
    const input = form.querySelector('input');
    const messages = panel.querySelector('.support-agent-messages');

    if (trigger) {
        trigger.classList.add('support-agent-trigger');
        trigger.setAttribute('role', 'button');
        trigger.setAttribute('tabindex', '0');
        trigger.setAttribute('aria-expanded', 'false');
        const open = () => { panel.classList.add('open'); trigger.setAttribute('aria-expanded', 'true'); setTimeout(() => input.focus(), 50); };
        trigger.addEventListener('click', open);
        trigger.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); }
        });
    }
    close.addEventListener('click', () => { panel.classList.remove('open'); trigger?.setAttribute('aria-expanded', 'false'); });

    const answerQuestion = question => {
        const text = question.toLowerCase();
        const hasSinhalaScript = /[\u0D80-\u0DFF]/.test(question);
        const singlishMarkers = ['kohomada', 'puluwan', 'karanna', 'wikun', 'goviya', 'ganna', 'gelapu', 'bada', 'pramana', 'danna', 'wela', 'wenna', 'hodai', 'saha', 'enna', 'mata', 'oya'];
        const language = hasSinhalaScript
            ? 'sinhala'
            : (singlishMarkers.some(marker => text.includes(marker)) ? 'singlish' : 'english');

        let bestCategory = 'greeting';
        let bestScore = 0;
        Object.entries(knowledge[language]).forEach(([category, words]) => {
            const score = words.filter(word => text.includes(word)).length;
            if (score > bestScore) {
                bestScore = score;
                bestCategory = category;
            }
        });

        if (language === 'sinhala') {
            if (!bestScore) return 'මට ගොවීන්, ගැණුම්කරුවන්, matching, allocation, Firebase sign-in හෝ data save කිරීම ගැන උදව් කරන්න පුළුවන්.';
        } else if (language === 'singlish') {
            if (!bestScore) return 'Mata farmers, buyers, matching, allocation, Firebase sign-in saha records save karanna help karanna puluwan. Prashne ahanna.';
        } else if (!bestScore) {
            return 'I can help with farmers, buyers, matching, allocations, Firebase sign-in, and saving data.';
        }

        return answers[language][bestCategory];
    };

    const sendQuestion = question => {
        const clean = question.trim();
        if (!clean) return;
        messages.insertAdjacentHTML('beforeend', `<div class="support-message user"><span>${escapeChatHtml(clean)}</span></div>`);
        input.value = '';
        const typing = document.createElement('div');
        typing.className = 'support-message agent typing';
        typing.innerHTML = '<span>Thinking…</span>';
        messages.append(typing);
        messages.scrollTop = messages.scrollHeight;
        window.setTimeout(() => {
            typing.remove();
            messages.insertAdjacentHTML('beforeend', `<div class="support-message agent"><span>${escapeChatHtml(answerQuestion(clean))}</span></div>`);
            messages.scrollTop = messages.scrollHeight;
        }, 450);
    };

    form.addEventListener('submit', event => { event.preventDefault(); sendQuestion(input.value); });
    panel.querySelectorAll('.support-suggestions button').forEach(button => {
        button.addEventListener('click', () => sendQuestion(button.textContent));
    });
}