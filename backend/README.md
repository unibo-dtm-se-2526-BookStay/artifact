# BookStay Backend

Backend service for the BookStay hotel booking application.

## Requirements

- Node.js
- npm

## Installation

Install dependencies from the lockfile:

```bash
npm ci
```

Create a local environment file from `.env.example`. Never commit `.env`.

## Environment variables

Create `.env` from `.env.example` and configure:

- `PORT`: optional HTTP port; defaults to `4000`.
- `MONGODB_URI`: required MongoDB connection string.
- `CLOUDINARY_NAME`: Cloudinary product-environment name.
- `CLOUDINARY_API_KEY`: Cloudinary API key.
- `CLOUDINARY_API_SECRET`: Cloudinary API secret.

Never commit `.env` or expose database and external-service credentials.

## Database

The backend connects to the `hotel` database through Mongoose. The server waits for the database connection before accepting HTTP requests.

## Media storage

Cloudinary is configured during server startup using private environment variables. Never commit or expose the Cloudinary API secret.

## Available scripts

```bash
npm start
npm run server
npm test
npm run coverage
```

- `npm start` starts the server normally.
- `npm run server` starts the server with Nodemon.
- `npm test` runs the Jest tests.
- `npm run coverage` runs tests and generates coverage.

## API

Current public endpoints:

```text
GET /api/v1/health
```

Hotel endpoints:

```text
POST /api/v1/hotels/add
GET /api/v1/hotels/list
POST /api/v1/hotels/remove
GET /api/v1/hotels/rooms/:id
```

Reservation endpoints:

```text
POST /api/v1/reservations/create
GET /api/v1/reservations/get
DELETE /api/v1/reservations/delete/:id
```

All new API routes should stay under the `/api/v1` prefix.

## Testing

The backend currently uses Jest and Supertest for automated tests.

```bash
npm test
npm run coverage
```

Current tested areas:

- Health API route.
- JSON 404 response for unknown routes.
- MongoDB connection configuration.
- Cloudinary configuration.
- Hotel model validation.
- Hotel list route.
- Reservation model validation.
- Multer upload middleware configuration.

Run tests before committing backend changes.

## Project checklist notes

- Keep secrets in `.env` only and document required keys in `.env.example`.
- Do not commit generated files such as `node_modules` or coverage output.
- Prefer small, focused commits with Conventional Commit messages.
- Add or update tests when adding backend behavior.
- Admin authentication and user routes are still in progress.
- Docker, CI, coverage threshold enforcement, and OpenAPI expansion are still future checklist items.

The OpenAPI specification is located at `docs/openapi.yaml`.
