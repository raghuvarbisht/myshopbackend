import express, {NextFunction, Request, Response} from 'express'
import User from '../models/User'
import bcrypt from 'bcrypt' 
import { CustomError } from '../middlewares/error'
import jwt , { SignOptions } from "jsonwebtoken"

const router = express.Router()

//Register

router.post('/register', async (req: Request , res : Response, next: NextFunction) =>{
    try {
        const {name, email, password} = req.body
        const existingUser = await User.findOne({email})
        if (existingUser) {
            throw new CustomError(400,"User already exists!");
            // res.status(400).json("User already exists!")
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({...req.body, password: hashedPassword});
        const savedUser = await newUser.save()
        res.status(201).json(savedUser);
    } catch (error) {
        next(error)
        //res.status(500).json(error);
    }
})

//login

router.post("/login", async (req: Request, res: Response , next : NextFunction) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if (!user) {
            throw new CustomError(404, "User not found!");
        }
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            throw new CustomError(401, "Wrong credentials!");
        }
        
        
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET!,
        {
            expiresIn: Number(process.env.JWT_EXPIRE) || 3600,
        }
        );


      res.cookie("token", token).status(200).json("Login successful");

    } catch (error) {
        next(error);
    }

})


export default router;