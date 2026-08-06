import upload from '../middleware/multer.js'

describe('Multer upload middleware', () => {
  test('exports a configured single-file middleware factory', () => {
    const middleware = upload.single('image')

    expect(typeof middleware).toBe('function')
  })
})