import express from 'express'
import { addHotel, listHotel, removeHotel, singleHotel } from '../controllers/hotelController.js'

const hotelRouter = express.Router()

hotelRouter.post('/add', addHotel)
hotelRouter.get('/list', listHotel)
hotelRouter.post('/remove', removeHotel)
hotelRouter.get('/rooms/:id', singleHotel)

export default hotelRouter
