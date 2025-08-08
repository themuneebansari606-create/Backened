
import express from 'express';
import Images from '../Models/Images.js';  // Make sure the path to the model is correct

const deleteImage = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send('Image ID is required');  // 400 Bad Request if no ID provided
  }

  try {
    const image = await Images.findById(id);

    if (!image) {
      return res.status(404).send('Image not found');  // 404 Not Found if image is not found
    }

   
    await image.deleteOne();
    
    res.status(200).send('Image deleted');  // 200 OK if deletion is successful
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).send('An error occurred while deleting the image');  // 500 Internal Server Error
  }
};

export default deleteImage;
