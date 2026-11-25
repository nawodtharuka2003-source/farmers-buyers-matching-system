# CropLink

CropLink is a browser-based agricultural supply coordination demo. It helps coordinators compare farmers' available produce with buyer requests, review recommended matches, and plan supply allocations.

## Live demo

https://nawodtharuka2003-source.github.io/farmers-buyers-matching-system/

## Features

- **Dashboard:** Overview of farmers, buyer requests, supply, and recommended matches.
- **Farmers:** Add and search farmer produce, quantity, asking price, and location.
- **Buyer demand:** Add and search crop requests, quantities, target prices, and delivery locations.
- **Smart matches:** Rank crop-compatible offers that meet a buyer's maximum price. Suitability considers price, distance, and supply coverage.
- **Allocations:** Allocate available stock to compatible requests without assigning more than a farmer has listed.
- **Route map:** View road-route information for selected matches.

Recommendations are for decision support. Confirm produce quality, availability, prices, and delivery terms with participants.

## Matching and shortest paths

The matching engine uses **Dijkstra's algorithm** to find the shortest approximate road distance between locations in its weighted Sri Lanka region graph. This distance helps determine whether a farmer is reachable and contributes to the match score. The ranking weights distance at 45%, price fit at 35%, and supply coverage at 20%. The graph distances are illustrative approximations, not verified live road distances.

## Technology

- HTML, CSS, and JavaScript modules
- Firebase Authentication and Cloud Firestore
- Chart.js for dashboard charts
- Leaflet and OpenStreetMap-based services for route maps

## Run locally

Serve the project over HTTP from its root folder; opening `index.html` directly as a file may prevent JavaScript modules from loading.

With Python installed, run:

```powershell
py -m http.server 8000
```

Then open http://localhost:8000 in a browser. Stop the local server with `Ctrl+C`.

## Firebase setup

The app uses Firebase Authentication for sign-in and Cloud Firestore for farmer and buyer records. To run it with your own Firebase project:

1. Configure the web app settings in `firebase-config.js`.
2. Enable the Email/Password sign-in provider in Firebase Authentication.
3. Users can create accounts from the sign-in screen with their email address and a password, or you can create accounts in Firebase Authentication.
4. Create a Firestore database and configure security rules to protect each user's records.
5. For the GitHub Pages deployment, add `nawodtharuka2003-source.github.io` to Firebase Authentication's authorized domains.

Never put Firebase Admin credentials, service-account keys, or other private secrets in client-side files.

## Run tests

The matching and allocation tests can be run with Node.js:

```powershell
node test.js
```

## GitHub Pages deployment

The live site is published from the `main` branch at the repository root. To configure it, open the repository's **Settings > Pages**, choose **Deploy from a branch**, select `main` and `/(root)`, then save.
