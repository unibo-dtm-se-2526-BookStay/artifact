import request from 'supertest'
import { jest } from '@jest/globals'

const mockSave = jest.fn()
const mockFind = jest.fn()
const mockFindByIdAndDelete = jest.fn()

jest.unstable_mockModule('../models/reservationModels.js', () => ({
  default: jest.fn().mockImplementation((data) => ({
    ...data,
    save: mockSave
  }))
}))

const { default: Reservation } = await import('../models/reservationModels.js')
Reservation.find = mockFind
Reservation.findByIdAndDelete = mockFindByIdAndDelete

const { default: app } = await import('../app.js')

describe('Reservation routes', () => {
  beforeEach(() => {
    mockSave.mockResolvedValue()
    mockFind.mockResolvedValue([])
    mockFindByIdAndDelete.mockResolvedValue({})
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('GET /api/v1/reservations/get returns reservations', async () => {
    mockFind.mockResolvedValue([
      {
        name: 'Test User',
        email: 'test@example.com',
        phone: '123456789',
        checkin: '2026-08-10',
        checkout: '2026-08-12',
        guests: '2',
        roomName: 'Deluxe Room',
        roomId: 'room-123'
      }
    ])

    const response = await request(app).get('/api/v1/reservations/get')

    expect(response.status).toBe(200)
    expect(response.body.reservations).toHaveLength(1)
    expect(mockFind).toHaveBeenCalled()
  })

  test('POST /api/v1/reservations/create creates a reservation', async () => {
    const reservationData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '123456789',
      checkin: '2026-08-10',
      checkout: '2026-08-12',
      guests: '2',
      roomName: 'Deluxe Room',
      roomId: 'room-123'
    }

    const response = await request(app)
      .post('/api/v1/reservations/create')
      .send(reservationData)

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Reservation created successfully')
    expect(mockSave).toHaveBeenCalled()
  })

  test('POST /api/v1/reservations/create rejects missing fields', async () => {
    const response = await request(app)
      .post('/api/v1/reservations/create')
      .send({ name: 'Test User' })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      message: 'All fields are required'
    })
    expect(mockSave).not.toHaveBeenCalled()
  })

  test('DELETE /api/v1/reservations/delete/:id deletes a reservation', async () => {
    const response = await request(app).delete('/api/v1/reservations/delete/123')

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Reservation deleted successfully')
    expect(mockFindByIdAndDelete).toHaveBeenCalledWith('123')
  })
})