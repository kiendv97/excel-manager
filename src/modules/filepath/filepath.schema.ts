import { Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
const filepathSchema = new Schema({

    name: {
        type: String,
        default: '',
        required: true
    },
    path: {
        type: String,
        default: '',
        required: true
    }

}, {
    timestamps: true
})
export const FilepathSchema = filepathSchema