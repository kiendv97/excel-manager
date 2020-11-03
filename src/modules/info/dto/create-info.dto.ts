import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateInfoDto {
  @ApiProperty()
  @IsNotEmpty()
  receiver: String;
  @IsNotEmpty()
  sender: String;
  @IsNotEmpty()
  subject: String;
  @IsNotEmpty()
  text: String;
  @IsNotEmpty()
  date: String;
  @IsNotEmpty()
  attachments: Array<Object>;
}
