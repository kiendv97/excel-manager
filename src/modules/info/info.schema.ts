import { Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
const infoSchema = new Schema(
  {
    receiver: {
      type: String,
      default: '',
    },
    sender: {
      type: String,
      default: '',
    },
    subject: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
    attachments: {
      type: Array,
      default: [],
    },
    readed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  },
);
export const InfoSchema = infoSchema;
