import request from 'supertest'
import { jest } from '@jest/globals'

const mockFind = jest.fn()
const mockFindById = jest.fn()
const mockFindByIdAndDelete = jest.fn()

jest.unstable_mockModule('../models/hotelModels.js', () => ({
  default: {
    find: mockFind,
    findById: mockFindById,
    findByIdAndDelete: mockFindByIdAndDelete
  }
}))

const { default: app } = await import('../app.js')

describe('Hotel routes', () => {
  beforeEach(() => {
    mockFind.mockResolvedValue([])
    mockFindById.mockResolvedValue(null)
    mockFindByIdAndDelete.mockResolvedValue({})
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('GET /api/v1/hotels/list returns hotels', async () => {
    mockFind.mockResolvedValue([])

    const response = await request(app).get('/api/v1/hotels/list')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      success: true,
      hotels: []
    })
  })

  test('POST /api/v1/hotels/remove removes a hotel', async () => {
    const response = await request(app)
      .post('/api/v1/hotels/remove')
      .send({ _id: 'hotel-123' })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      success: true,
      message: 'Hotel room removed successfully'
    })
    expect(mockFindByIdAndDelete).toHaveBeenCalledWith('hotel-123')
  })

  test('GET /api/v1/hotels/rooms/:id returns a hotel', async () => {
    mockFindById.mockResolvedValue({
      _id: 'hotel-123',
      name: 'Test Hotel'
    })

    const response = await request(app).get('/api/v1/hotels/rooms/hotel-123')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      success: true,
      hotel: {
        _id: 'hotel-123',
        name: 'Test Hotel'
      }
    })
  })

  test('GET /api/v1/hotels/rooms/:id returns not found when hotel is missing', async () => {
    mockFindById.mockResolvedValue(null)

    const response = await request(app).get('/api/v1/hotels/rooms/missing-id')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      success: false,
      message: 'Hotel not found'
    })
  })
})