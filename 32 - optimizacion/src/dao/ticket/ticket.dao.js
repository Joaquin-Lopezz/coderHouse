import { model } from 'mongoose';
import { ticketSchema } from './mongoose/ticket.models.mongoose.js';
import { ticketDaoMongoose } from './mongoose/ticket.dao.mongoose.js';

let daoTicket;

const ticketModel = model('ticket', ticketSchema);
daoTicket = new ticketDaoMongoose(ticketModel)
console.log('persistiendo ticket en :mongodb')

export function getDaoTicket (){
    return daoTicket
}