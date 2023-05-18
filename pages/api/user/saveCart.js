import nextConnect from "next-connect";
import db from "../../../utils/db";
import Product from "../../../models/Product";
import User from "../../../models/User";
import Cart from "../../../models/Cart";

const handler = nextConnect();

handler.post(async(req,res)=>{
    try {
        db.connectDB();
        const {cart, user_id} = req.body;
        let product = [];
        let user = await User.findById(user_id);
        let existing_cart = await Cart.findOne({user: user._id});
        if(existing_cart){
            await existing_cart.remove();
        } 
        for (var i=0; i < cart.length; i++){
            let dbProduct = await Product.findById(cart[i]._id).lean();
            let subProduct = dbProduct.subProducts[cart[i].style];
            let  tempProduct = {};
            tempProduct.name = dbProduct.name;
            tempProduct.product = dbProduct._id;
            tempProduct.color = {
                color: cart[i].color.color,
                image: cart[i].color.image,
            };
            tempProduct.image = subProduct.images[0].url;
            tempProduct.qty = Number(cart[i].qty);
            tempProduct.size = cart[i].size;
        }
        db.disconnectDb();
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
});

export default handler;
