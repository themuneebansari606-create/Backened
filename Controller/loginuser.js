import  {User}  from '../Models/User.js'
import { configDotenv } from 'dotenv'
import jwt from 'jsonwebtoken'
configDotenv()
const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!(email && password)) { return res.send(" email and password is required") }

        const existUser = await User.findOne({ email })
        if (!existUser) {
            return res.status(400).send('invalid credential')
        }

        const isPassword = await password == existUser.password
        if (!isPassword) {
            return res.status(400).send({ message: ' invalid credential ' })
        }

        const token = jwt.sign({ userId: existUser._id, email: existUser.email }, process.env.JWT_SECRET_KEY)
        //  localStorage.setItem('token',token)
       


        return res.status(200).send({ status: 200, message: "User login Successfully!", data: existUser, token: token });

    } catch (error) {
        res.send({ message: error.message })
    }
}
export default loginUser