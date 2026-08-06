import Hotel from '../models/hotelModels.js'

describe('Hotel persistence model', () => {
  test('validates a hotel with all required fields', async () => {
    const hotel = new Hotel({
      name: 'Test Hotel',
      price: 120,
      description: 'A hotel used for testing',
      image: 'https://example.com/hotel.jpg',
      date: Date.now()
    })

    await expect(hotel.validate()).resolves.toBeUndefined()
  })

  test('rejects a hotel with missing required fields', async () => {
    const hotel = new Hotel()
    const validationError = await hotel.validate().catch((error) => error)

    expect(validationError).toBeDefined()
    expect(Object.keys(validationError.errors)).toEqual(
      expect.arrayContaining([
        'name',
        'price',
        'description',
        'image',
        'date'
      ])
    )
  })
})
