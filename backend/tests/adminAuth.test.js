import jwt from 'jsonwebtoken'
import { jest } from '@jest/globals'
import adminAuth from '../middleware/adminAuth.js'

describe('Admin authentication middleware', () => {
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

  test('rejects requests without a token', async () => {
    const req = { headers: {} }
    const res = { json: jest.fn() }
    const next = jest.fn()

    await adminAuth(req, res, next)

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Unauthorized User'
    })
    expect(next).not.toHaveBeenCalled()
  })

  test('allows requests with a valid admin token', async () => {
    const token = jwt.sign('admin@test.compassword123', 'test-secret')
    const req = { headers: { token } }
    const res = { json: jest.fn() }
    const next = jest.fn()

    await adminAuth(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })

  test('rejects requests with an invalid token', async () => {
    const req = { headers: { token: 'bad-token' } }
    const res = { json: jest.fn() }
    const next = jest.fn()

    await adminAuth(req, res, next)

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Authentication not successful'
    })
    expect(next).not.toHaveBeenCalled()
  })
})
