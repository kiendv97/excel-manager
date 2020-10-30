import { Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
const infoSchema = new Schema({

    receiver: {
        type: String,
        default: '',
        required: true
    },
    sender: {
        type: String,
        default: '',
        required: true
    },
    subject: {
        type: String,
         default: '',
         required: true
    },
    text: {
        type: String,
         default: '',
         required: true
    },
    sendDate: {
        type: String,
         default: '',
         required: true
    },
    attachments: {
        type: Array, 
        default: [],
        required: false
    }


}, {
    timestamps: true
})
export const InfoSchema = infoSchema