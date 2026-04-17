# GroNest (React + Node)

GroNest is a grocery shopping cart application with:
- React + Vite frontend
- Express backend API
- Optional MongoDB integration (falls back to local JSON data)

## Features
- Category-based product browsing (Daily Essentials, Cooking Essentials, Fresh Produce, Snacks & Munchies)
- Search and filter support
- Add to cart / remove from cart
- Login and signup pages (UI flows)
- Product image mapping with local/cloud assets

## Tech Stack
- Frontend: React 19, React Router, Vite
- Backend: Express 5, Node.js
- Data: Local JSON file (`src/data/products.json`) and optional MongoDB (`mongoose`)
- State management: React Context (`src/context/CartContext.jsx`)

## Project Structure
- `src/`
- `src/components/` reusable UI components
- `src/pages/` route pages
- `src/context/` cart state provider
- `src/services/` frontend API client
- `src/data/products.json` catalog source
- `public/assets/products/` product image assets
- `server.cjs` backend server
- `models/Product.cjs` Mongoose model

## API Endpoints
- `GET /api/products`
: Returns product list.
: If MongoDB is connected and has products, server returns DB records.
: Otherwise server returns local JSON from `src/data/products.json`.
- `POST /api/seed`
: Seeds MongoDB from local JSON (works only if MongoDB is connected).
- `GET /api/test`
: Backend health test response.

## Prerequisites
- Node.js 18+
- npm
- Optional: MongoDB running locally on `mongodb://127.0.0.1:27017/gronest`

## Install
```bash
npm install
```

## Run
- Frontend only:
```bash
npm run dev
```
- Backend only:
```bash
npm run dev:server
```
- Frontend + Backend together:
```bash
npm run dev:full
```

When both are running:
- Frontend: Vite URL shown in terminal (usually `http://localhost:5173` or next free port)
- Backend: `http://localhost:5000`

## Build
```bash
npm run build
```

## Configuration Notes
- Vite proxy is configured in `vite.config.js` so frontend `/api/*` calls go to backend port `5000` during development.
- Backend enables CORS and JSON parsing.
- Mongo connection failures are handled gracefully; app can still work from local JSON data.

## Product Data Management
- Main source: `src/data/products.json`
- Each product entry includes:
  - `name`
  - `price`
  - `category`
  - `image`
- Image paths should typically be under `/assets/products/...` for stable rendering.

## Cleanup Performed
- Removed unused utility and template files.
- Removed generated `dist/` output from source tree.
- Kept only actively used frontend/backend files.

## Known Limitations
- Auth pages are UI-only and not connected to backend auth APIs.
- Product image quality depends on current asset files in `public/assets/products`.

## Future Improvements
- Add backend auth APIs and JWT flow
- Add product admin CRUD and image upload
- Add persistent cart per user
- Add tests (unit + integration)
