import express from 'express'
const app = express()
import Images from '../Models/Images.js'
 const getImages = async (req , res) => {
    try {

        
        const allimage = await Images.find({})
        res.status(200).send(allimage)
    }catch (error) {
        res.send(error.message)
        
    }};
    export default getImages