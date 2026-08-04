import request from 'supertest'
import app from '../app.js'

describe('Health API', () => {
  test('GET /api/v1/health returns a successful response', async () => {
    const response = await request(app).get('/api/v1/health')

    expect(response.status).toBe(200)
    expect(response.text).toBe('API Working!')
  })

 test('an unknown API route returns a JSON 404 error', async () => {
  const response = await request(app).get('/api/v1/unknown')

  expect(response.status).toBe(404)
  expect(response.headers['content-type']).toMatch(/json/)
  expect(response.body).toEqual({
    error: {
      code: 'NOT_FOUND',
      message: 'Route not found'
    }
  })
})
})