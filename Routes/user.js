import express from 'express'
import { CreateUser } from '../Controller/Createuser.js'
import loginUser from '../Controller/loginuser.js'
import getImages from '../Controller/Getimage.js'
import Images from '../Models/Images.js'
import deleteImage from '../Controller/Deleteimage.js'
import { configDotenv } from 'dotenv'
import cloudinary from 'cloudinary'
import fs from 'fs'
import multer from 'multer'
configDotenv()
const router = express.Router()
router.post('/create-user',CreateUser)
router.post('/login-user',loginUser)  
router.get('/getimage',getImages)
router.delete('/image/:id',deleteImage)

cloudinary.v2.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.cloud_api_key,
  api_secret:process.env.cloud_secret_api_key,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './Image')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + file.originalname)
  }
})

const upload = multer({ storage: storage });

router.post("/upload", upload.single("pic"), async(req, res) => {

  const files = fs.readdirSync("Image/");
  const uploadedImages = [];

  for (const file of files) {
    try {
      const result = await cloudinary.v2.uploader.upload(`Image/${file}`);
      fs.unlink(`Image/${file}`, (err) => {
        if (err) console.error("Failed to delete file:", err);
        else console.log("Deleted local file successfully");
      });

      const savedImage = new Images({ url: result.url });
      await savedImage.save();
      uploadedImages.push(savedImage);
    } catch (error) {
      console.error("Upload error:", error);
      return res.status(500).json({ status: 500, message: "Upload failed", error });
    }
  }

  // ✅ Send response once after all files are processed
  return res.status(200).json({
    status: 200,
    message: "All files uploaded and saved successfully",
    data: uploadedImages,
  });
});


export default router
