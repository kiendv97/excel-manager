import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class FilePathDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly name: string;
    @IsNotEmpty()
    readonly path: string;
}