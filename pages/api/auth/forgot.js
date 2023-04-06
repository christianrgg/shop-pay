import nextConnect from "next-connect";
import bcrypt from "bcrypt"
import { validateEmail } from "../../../utils/validation";
import db from "../../../utils/db"
import User from "../../../models/User";
import { createActivationToken } from "../../../utils/tokens";
import { sendEmail } from "../../../utils/sendEmails";

const handler = nextConnect();

handler.post(async(req,res)=>{
    try {
        await db.connectDB();
        const {email}= req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.json({message:"This email does not exist."})
        }
        const url = `${process.env.BASE_URL}/activate/${activation_token}`;
        res.send(email);
        sendEmail(email, url, "","Activate your account.");
        await db.disconnectDb();
        res.json({message:"Register success! Please activate your email to start."});
    } catch (error) {
        res.status(500).json({message: error.message, errorLine: error.stack})
    }
});

export default handler;

