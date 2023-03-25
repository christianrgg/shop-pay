import nextConnect from "next-connect";
import { validateEmail } from "../../../utils/validation";
import db from "../../../utils/db"

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
    } catch (error) {
        res.status(500).json({message: error.message})
    }

});

export default handler;

