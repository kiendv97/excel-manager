import { Document } from 'mongoose';
export interface IFilepath extends Document {
    readonly name: string;
    readonly path: string
}