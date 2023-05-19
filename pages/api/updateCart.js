import nextConnect from "next-connect";
import Product from "../../models/Product";
import db from "../../utils/db";

const handler = nextConnect();

handler.post(async(req,res)=>{
    try {
        db.connectDB();
        const promises = req.body.products.map(async(p)=>{
            let dbProduct = await Product.findById(p._id).lean();
            let originalPrice = dbProduct.subProducts[p.style]?.sizes.find(
                (x)=>x.size == p.size
                )?.price;
            let quantity = dbProduct.subProducts[p.style]?.sizes.find(
                (x)=>x.size == p.size
                )?.qty;
            let discount = dbProduct.subProducts[p.style]?.discount;
            return {
                ...p,
                priceBefore: originalPrice,
                price:
                    discount > 0
                        ? originalPrice - originalPrice / discount
                        : originalPrice,
                discount: discount,
                quantity: quantity,
                shippingFee: dbProduct.shipping,
            };
        });
        const data = await Promise.all(promises);
        db.disconnectDb();
        return res.json(data);  
    } catch (error) {
        // return res.status(500).json({message: error.message});
        const errorMessage = error.message || 'Error desconocido';
        const errorDetails = error.details || 'Detalles del error no disponibles';
        const statusCode = error.statusCode || 500;

        return res.status(statusCode).json({
          message: errorMessage,
          details: errorDetails,
        });
    }
});

export default handler;
