import { v2 as cloudinary } from 'cloudinary'

const configureCloudinary = () => {
  const {
    CLOUDINARY_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
  } = process.env

  if (
    !CLOUDINARY_NAME ||
    !CLOUDINARY_API_KEY ||
    !CLOUDINARY_API_SECRET
  ) {
    throw new Error('Cloudinary configuration is incomplete')
  }

  cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
  })

  console.log('Cloudinary configured')
}

export default configureCloudinary