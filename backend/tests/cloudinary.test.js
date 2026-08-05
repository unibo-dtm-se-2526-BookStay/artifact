import { jest } from '@jest/globals'

const configMock = jest.fn()

jest.unstable_mockModule('cloudinary', () => ({
  v2: {
    config: configMock
  }
}))

const { default: configureCloudinary } = await import(
  '../config/cloudinary.js'
)

describe('Cloudinary configuration', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
    delete process.env.CLOUDINARY_NAME
    delete process.env.CLOUDINARY_API_KEY
    delete process.env.CLOUDINARY_API_SECRET
  })

  test('throws when Cloudinary configuration is incomplete', () => {
    expect(() => configureCloudinary()).toThrow(
      'Cloudinary configuration is incomplete'
    )

    expect(configMock).not.toHaveBeenCalled()
  })

  test('configures Cloudinary using environment variables', () => {
    process.env.CLOUDINARY_NAME = 'test-cloud'
    process.env.CLOUDINARY_API_KEY = 'test-key'
    process.env.CLOUDINARY_API_SECRET = 'test-secret'

    const logSpy = jest.spyOn(console, 'log').mockImplementation()

    configureCloudinary()

    expect(configMock).toHaveBeenCalledWith({
      cloud_name: 'test-cloud',
      api_key: 'test-key',
      api_secret: 'test-secret'
    })
    expect(logSpy).toHaveBeenCalledWith('Cloudinary configured')
  })
})