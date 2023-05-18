import mongoose from "mongoose";
import { string } from "yup";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Plaease enter your full name.",
    },
    email: {
        type: String,
        required: "Please enter your email address.",
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: "Please enter a password."
    },
    role: {
        type: String,
        default:"user"
    },
    image: {
        type: String,
        default:"https://res.cloudinary.com/ddfzagwob/image/upload/v1679775035/shoppay/992490_b0iqzq_qubaae.png",
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    defaultPaymentMethod: {
        type: String,
        default:"",
    },
    address:[
        {
            firstName: {
                type: String,
            },
            lastName: {
                type: String,
            },
            phoneNumber: {
                type: String,
            },
            address1: {
                type: String,
            },
            address2: {
                type: String,
            },
            city: {
                type: String,
            },
            zipCode: {
                type: String,
            },
            state: {
                type: String,
            },
            country: {
                type: String,
            },
            active: {
                type: Boolean,
                default: false,
            },
        }
    ],
},
{
    timestamps: true,
}
);
// const User = mongoose.models.User || mongoose.model("User", userSchema);

// export default User;

let User;

try {
  User = mongoose.model('User');
} catch {
  User = mongoose.model('User', userSchema);
}

export default User;