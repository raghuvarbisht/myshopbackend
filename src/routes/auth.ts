import express, {Request, Response} from 'express'
import User from '../models/User'
import bcrypt from 'bcrypt' 

const router = express.Router()

//Register

router.post('/register', async (req: Request , res : Response) =>{
    try {
        const {name, email, password} = req.body
        const existingUser = await User.findOne({email})
        if (existingUser) {
            res.status(400).json("User already exists!")
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hashSync(password, salt);
        const newUser = new User({...req.body, password: hashedPassword});
        const savedUser = await newUser.save()
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json(error);
    }
})

export default router;