import { Prop } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";

export class CreateUserDTO { 
  @IsNotEmpty()
  username: String;

  @IsNotEmpty()
  full_name: String;

  @IsNotEmpty()
  phone: String;

  @IsNotEmpty()
  id_topsim: String;

  @IsNotEmpty()
  @Prop({required: true})
  pwd: String;

  @IsNotEmpty()
  @Prop({default: new Date()})
  loginAt: Date;
}