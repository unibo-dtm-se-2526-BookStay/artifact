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