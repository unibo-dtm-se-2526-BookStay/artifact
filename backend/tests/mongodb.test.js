import { jest } from '@jest/globals'

const connectMock = jest.fn()

jest.unstable_mockModule('mongoose', () => ({
  default: {
    connect: connectMock
  }
}))

const { default: connectDB } = await import('../config/mongodb.js')

describe('MongoDB connection', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
    delete process.env.MONGODB_URI
  })

  test('rejects when MONGODB_URI is missing', async () => {
    delete process.env.MONGODB_URI

    await expect(connectDB()).rejects.toThrow(
      'MONGODB_URI is not defined'
    )

    expect(connectMock).not.toHaveBeenCalled()
  })

  test('connects using the configured URI and hotel database', async () => {
    process.env.MONGODB_URI = 'mongodb://localhost:27017'
    connectMock.mockResolvedValue()

    const logSpy = jest.spyOn(console, 'log').mockImplementation()

    await connectDB()

    expect(connectMock).toHaveBeenCalledWith(
      'mongodb://localhost:27017',
      { dbName: 'hotel' }
    )
    expect(logSpy).toHaveBeenCalledWith(
      'MongoDB connection established'
    )
  })
})