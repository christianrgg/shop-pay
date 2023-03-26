import nextConnect from "next-connect";
import bcrypt from "bcrypt"
import { validateEmail } from "../../../utils/validation";
import db from "../../../utils/db"
import User from "../../../models/User";
import { createActivationToken } from "../../../utils/tokens";

const handler = nextConnect();

handler.post(async(req,res)=>{
    // res.send("Welcome from sign up API")
    try {
        await db.connectDB();
        const {name, email, password}= req.body;
        if(!name || !email || !password){
            return res.status(400).json({message:"Please fill in all field."})
        }
        if(!validateEmail(email)){
            return res.status(400).json({message:"Invalid email."})
        }
        const user = await User.findOne({email});
        if(user){
            return res
            .status(400)
            .json({message:"This email already exists."});
        }
        if(password.length<6){
            return res
            .status(400)
            .json({message:"Password must be atleast 6 characters."});
        }
        const cryptedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({name,email,password:cryptedPassword});
        const addedUser = await newUser.save();
        const activation_token = createActivationToken({
            id: addedUser._id.toString(),

        });
        // res.send(addedUser);
        const url = `${process.env.BASE_URL}/activate/${activation_token}`;
        res.send(url);
    } catch (error) {
        // res.status(500).json({message: error.message})
        res.status(500).json({message: error.message, errorLine: error.stack})
        
    }

});

export default handler;

