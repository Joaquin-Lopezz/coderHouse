import { Schema, model } from 'mongoose';


const cartsSchema = new Schema(
    {
        _id: {
            type: String,
            default: () => Math.random().toString(36).substring(2),
        },
        products: [{
            producto: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                default: 1,
            },
        }],
    },
    {
        strict: 'throw',
        versionKey: false,
        _id: false,  
    }
);
export const cartsManager = model('carritos', cartsSchema);
