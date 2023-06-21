import mongoose from 'mongoose';

const usersCollection = 'users';

const usersSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    age: Number,
    cart: { 
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "carts"
        }],
        default: []
    },
    role: {
        type: String,
        default: 'user'
    }
});

const usersModel = mongoose.model( usersCollection, usersSchema );

export default usersModel;