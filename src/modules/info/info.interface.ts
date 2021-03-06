import { Document } from "mongoose";

export class IInfo extends Document { 
    readonly receiver: string;
    readonly sender: string;
    readonly subject: string;
    readonly date: string;
    readonly text: string;
    readonly attachments: Array<Object>;

}