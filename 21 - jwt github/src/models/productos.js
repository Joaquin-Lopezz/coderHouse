import { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const productoSchema = new Schema(
    {
        _id: {
            type: String, //genera un codigo random ya que no medejaba usar  RandomUUID
            default: () => Math.random().toString(36).substring(2),
        },
        title: { type: String, required: true },
        description: { type: String, default: null },
        price: { type: Number, required: true },
        thumbnail: { type: String, required: true },
        code: { type: String, required: true, unique: true },
        stock: { type: Number, required: true },
        category: { type: String, required: true },
        status: { type: String, required: true },
    },
    {
        strict: 'throw',
        versionKey: false,
        methods: {},
    }
);

productoSchema.plugin(paginate);

export const productosManager = model('productos', productoSchema);
