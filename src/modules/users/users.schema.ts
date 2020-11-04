import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: String;

  @Prop()
  full_name: String;

  @Prop()
  phone: String;

  @Prop()
  id_topsim: String;

  @Prop()
  pwd: String;

  @Prop()
  loginAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
