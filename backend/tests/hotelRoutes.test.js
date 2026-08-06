import request from 'supertest'
import { jest } from '@jest/globals'

const mockFind = jest.fn()

jest.unstable_mockModule('../models/hotelModels.js', () => ({
  default: {
    find: mockFind
  }
}))

const { default: app } = await import('../app.js')

describe('Hotel routes', () => {
  test('GET /api/v1/hotels/list returns hotels', async () => {
    mockFind.mockResolvedValue([])

    const response = await request(app).get('/api/v1/hotels/list')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      success: true,
      hotels: []
    })
  })
})
