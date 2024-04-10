const cloudinary=require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'dp9idx7ur',
  api_key: '548737639488245',
  api_secret: '1KW8ct1a_KMyTNnbIubsuJNMCF8'
});

// Configure multer storage for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'blog-posts', // Folder name in Cloudinary where the images will be stored
      public_id: (req, file) => `${Date.now()}-${file.originalname}`// Public ID of the image
    }
  });

const upload = multer({ storage: storage });
module.exports=upload