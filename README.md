# CropLink

CropLink is a browser-based agricultural supply coordination demo. It helps coordinators compare farmers' available produce with buyer requests, review recommended matches, and plan supply allocations.

## Live demo

https://nawodtharuka2003-source.github.io/farmers-buyers-matching-system/

## Features

- **Dashboard:** Overview of farmers, buyer requests, supply, and recommended matches.
- **Farmers:** Add and search farmer produce, quantity, asking price, and location.
- **Buyer demand:** Add and search crop requests, quantities, target prices, and delivery locations.
- **Smart matches:** Rank crop-compatible offers that meet a buyer's maximum price. Suitability considers price, distance, and supply coverage.
- **Allocations:** Suggest supply for buyer requests, then confirm completed sales to update farmer stock and remaining buyer demand.
- **Route map:** View road-route information for selected matches.
- **Dark mode:** Follows your device setting by default and remembers your choice when you switch themes.
- **Languages:** Switch the interface between English, Sinhala, and Tamil; the selected language is remembered on the device.

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

## OpenAI assistant setup

The CropLink AI Chatbot answers CropLink questions and general questions through OpenAI and a Firebase Cloud Function. Users can ask in Sinhala, English, or Singlish, and the chatbot is instructed to reply in the same language and style. It requires a signed-in Firebase user, only receives the conversation (not farmer or buyer records), and allows up to 30 requests per Firebase user per UTC day. The OpenAI API key stays in Firebase Secret Manager and must never be added to `app.js` or `firebase-config.js`.

1. Enable billing for the Firebase project (Cloud Functions may require the Blaze plan) and make sure the project has a Firestore database.
2. Create an OpenAI API key and enable billing or usage for the OpenAI API. Set an OpenAI spending limit.
3. Install the Firebase CLI and sign in with an account that can deploy functions to this Firebase project.
4. From the project root, install the function dependencies and store the key as a Firebase secret:

   ```powershell
   npm --prefix functions install
   firebase login
   firebase functions:secrets:set OPENAI_API_KEY --project farming-management-syste-57dec
   ```

5. Deploy the function:

   ```powershell
   firebase deploy --only functions --project farming-management-syste-57dec
   ```

The assistant endpoint is configured for this Firebase project and the published GitHub Pages origin. After deployment, sign in to CropLink to use it.

## Run tests

The matching and allocation tests can be run with Node.js:

```powershell
node test.js
```

## GitHub Pages deployment

The live site is published from the `main` branch at the repository root. To configure it, open the repository's **Settings > Pages**, choose **Deploy from a branch**, select `main` and `/(root)`, then save.
