import 'dotenv/config'
import app from './app.js'
import configureCloudinary from './config/cloudinary.js'
import connectDB from './config/mongodb.js'

const PORT = process.env.PORT || 4000

try {
  configureCloudinary()
  await connectDB()

  app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
  })
} catch (error) {
  console.error(`Server startup failed: ${error.message}`)
  process.exit(1)
}