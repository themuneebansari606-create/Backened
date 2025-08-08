import connectDB from "./DB/index.js";
import express from "express"
import router from "./Routes/user.js";
import cors from "cors"
const app = express()
connectDB()
app.use(cors())
app.use(express.json())
app.use('/api',router)
const PORT = 5000
app.listen(PORT ,()=>{ console.log( `your server is running on ${PORT}`)})
app.get('/',(req,res)=>{ res.send("hello world")})