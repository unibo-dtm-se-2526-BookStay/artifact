import reservationModel from '../models/reservationModels.js'

const createReservation = async (req, res) => {
  try {
    const { name, email, phone, checkin, checkout, guests, roomName, roomId } = req.body

    if (!name || !email || !phone || !checkin || !checkout || !guests || !roomName || !roomId) {
      return res.json({ message: 'All fields are required' })
    }

    const reservation = new reservationModel({
      name,
      email,
      phone,
      checkin,
      checkout,
      guests,
      roomName,
      roomId
    })
    await reservation.save()
    res.json({ message: 'Reservation created successfully', reservation })
  } catch (error) {
    console.log(error)
    res.json({ message: 'Error creating reservation' })
  }
}

const getAllReservations = async (req, res) => {
  try {
    const reservations = await reservationModel.find()
    res.json({ reservations })
  } catch (error) {
    console.log(error)
    res.json({ message: 'Error fetching reservations' })
  }
}

const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params
    await reservationModel.findByIdAndDelete(id)
    res.json({ message: 'Reservation deleted successfully' })
  } catch (error) {
    console.log(error)
    res.json({ message: 'Error deleting reservation' })
  }
}

export { createReservation, getAllReservations, deleteReservation }
