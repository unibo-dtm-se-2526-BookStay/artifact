import Reservation from '../models/reservationModels.js'

describe('Reservation persistence model', () => {
  test('validates a reservation with all required fields', async () => {
    const reservation = new Reservation({
      name: 'Test User',
      email: 'test@example.com',
      phone: '123456789',
      checkin: '2026-08-10',
      checkout: '2026-08-12',
      guests: '2',
      roomName: 'Deluxe Room',
      roomId: 'room-123'
    })

    await expect(reservation.validate()).resolves.toBeUndefined()
  })

  test('rejects a reservation with missing required fields', async () => {
    const reservation = new Reservation()
    const validationError = await reservation.validate().catch((error) => error)

    expect(validationError).toBeDefined()
    expect(Object.keys(validationError.errors)).toEqual(
      expect.arrayContaining([
        'name',
        'email',
        'phone',
        'checkin',
        'checkout',
        'guests',
        'roomName',
        'roomId'
      ])
    )
  })
})