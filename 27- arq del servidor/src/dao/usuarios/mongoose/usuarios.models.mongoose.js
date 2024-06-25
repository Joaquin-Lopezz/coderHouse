import { Schema } from 'mongoose';
import { randomUUID } from 'node:crypto';


export const usuariosSchema = new Schema(
    {
        _id: { type: String, default: randomUUID },
        email: { type: String, unique: true, required: true },
        password: { type: String, default: '(no aplica)' },
        nombre: { type: String, required: true },
        apellido: { type: String, default: '(sin especificar)' },
        rol: { type: String, default: 'usuario' },
    },
    {
        strict: 'throw',
        versionKey: false,
        statics: {

        },
        methods :{
            infoPublica: function  () {
                return {
                    nombre: this.nombre,
                    apellido: this.apellido,
                    email: this.email,
                    rol: this.rol,
                    _id: this._id,
                }
            }
        }
    }
);
