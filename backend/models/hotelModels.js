import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  date: {
    type: Number,
    required: true
  },

})

const hotelModel =
  mongoose.models.Hotel || mongoose.model('Hotel', hotelSchema)

export default hotelModel
