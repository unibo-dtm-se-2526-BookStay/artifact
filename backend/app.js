import express from 'express'
import cors from 'cors'
import hotelRouter from './routes/hotelRoute.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/v1/health', (req, res) => {
  res.send('API Working!')
})

app.use('/api/v1/hotels', hotelRouter)

app.use((req, res) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: 'Route not found'
    }
  })
})

export default app
