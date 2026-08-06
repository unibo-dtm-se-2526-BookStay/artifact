import 'dotenv/config'
import app from './app.js'
import connectDB from './config/mongodb.js'
import configureCloudinary from './config/cloudinary.js'

const PORT = process.env.PORT || 4000

const startServer = async () => {
  try {
    configureCloudinary()
    await connectDB()

    app.listen(PORT, () => {
      console.log(`Server started on Port: ${PORT}`)
    })
  } catch (error) {
    console.error(`Server startup failed: ${error.message}`)
    process.exit(1)
  }
}

startServer()
