import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateInfoDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly receiver: string;
    @IsNotEmpty()
    readonly sender: string;
    @IsNotEmpty()
    readonly subject: string;
    @IsNotEmpty()
    readonly text: string;
    @IsNotEmpty()
    readonly sendDate: Date;
    @IsNotEmpty()
    readonly attachments: string;
}