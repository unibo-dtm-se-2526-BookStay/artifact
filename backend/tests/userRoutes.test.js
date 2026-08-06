import request from 'supertest'
import app from '../app.js'

describe('User admin routes', () => {
  const originalEnv = process.env

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      JWT_SECRET: 'test-secret',
      ADMIN_EMAIL: 'admin@test.com',
      ADMIN_PASSWORD: 'password123'
    }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  test('POST /api/v1/users/admin returns a token for valid admin credentials', async () => {
    const response = await request(app)
      .post('/api/v1/users/admin')
      .send({
        email: 'admin@test.com',
        password: 'password123'
      })

    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
    expect(typeof response.body.token).toBe('string')
  })

  test('POST /api/v1/users/admin rejects invalid admin credentials', async () => {
    const response = await request(app)
      .post('/api/v1/users/admin')
      .send({
        email: 'wrong@test.com',
        password: 'wrong'
      })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      success: false,
      message: 'Invalid login details'
    })
  })
})