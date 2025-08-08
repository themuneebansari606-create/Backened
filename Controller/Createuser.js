import {User} from '../Models/User.js'
import { configDotenv } from 'dotenv'
import jwt from 'jsonwebtoken'
configDotenv()
export const CreateUser = async (req, res) => {
    const { username,email,password } = req.body
    try {
        if (!(username && email && password )) {
            return res.status(409).send({ status: 409, message: 'all feids are required' }) 
        }
        const existeduser = await User.findOne({username});
        if(existeduser) return  res.status(400).send({status:400,message:'username  already exist'})        
    
        const existedemail = await User.findOne({email});
        if(existedemail) return  res.status(400).send({status:400,message:'email  already exist'})
    
        const createUser = await User.create({
             username: username,
             email: email,
             password: password
            }).then(res=>res.toObject())
        
        if(!createUser){
            return  res.send('invald credential')
        }
           
            const token = jwt.sign({userId:createUser._id ,email: createUser.email}, process.env.JWT_SECRET_KEY)
            localStorage.setItem('token',token)
            res.cookie('JWT',token,{
                httpOnly:true,
                sameSite:'strict',
                secure:true
            })
          
            delete createUser.password
            return res.status(200).send({ status: 200, message: "User Created Successfully!", data:createUser, token: token },);

    }
    catch (error) {
        res.status(500).send({ status: 500, message: error.message })
    }
} 