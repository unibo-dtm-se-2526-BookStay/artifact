import request from 'supertest'
import { jest } from '@jest/globals'

const mockFind = jest.fn()
const mockFindById = jest.fn()
const mockFindByIdAndDelete = jest.fn()
const mockSave = jest.fn()
const mockHotelModel = jest.fn().mockImplementation((data) => ({
  ...data,
  save: mockSave
}))

mockHotelModel.find = mockFind
mockHotelModel.findById = mockFindById
mockHotelModel.findByIdAndDelete = mockFindByIdAndDelete

jest.unstable_mockModule('../models/hotelModels.js', () => ({
  default: mockHotelModel
}))

const { default: app } = await import('../app.js')

describe('Hotel routes', () => {
  beforeEach(() => {
    mockFind.mockResolvedValue([])
    mockFindById.mockResolvedValue(null)
    mockFindByIdAndDelete.mockResolvedValue({})
    mockSave.mockResolvedValue()
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

  test('POST /api/v1/hotels/add creates a hotel without uploaded image', async () => {
    const response = await request(app)
      .post('/api/v1/hotels/add')
      .send({
        name: 'Test Hotel',
        price: '120',
        description: 'A hotel used for testing'
      })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      success: true,
      message: 'Hotel room added successfully'
    })
    expect(mockHotelModel).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Test Hotel',
        price: 120,
        description: 'A hotel used for testing',
        image: 'https://via.placeholder.com/150'
      })
    )
    expect(mockSave).toHaveBeenCalled()
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
