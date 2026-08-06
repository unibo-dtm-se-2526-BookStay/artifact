import jwt from 'jsonwebtoken'

const adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET)
      res.json({ success: true, token })
    } else {
      return res.json({ success: false, message: 'Invalid login details' })
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: 'Error login in admin' })
  }
}

export { adminlogin }
