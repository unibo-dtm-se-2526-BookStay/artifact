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

The current public endpoint is:

```text
GET /api/v1/health
```

The OpenAPI specification is located at `docs/openapi.yaml`.
