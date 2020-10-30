import { Body, Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { FilePathDto } from "./dto/create-filepath.dto";
import { FilepathService } from "./filepath.service";

@Controller('filepath') 
export class FilepathController { 
    constructor(private filepathService: FilepathService) {}
    @Post('/create') 
    async createFilePath(@Res() res, @Body() filepathDto: FilePathDto) {
        const filepath  = await this.filepathService.create(filepathDto)
        return res.status(HttpStatus.OK).json({
            message: 'success',
            data: filepath
        })
    }
    @Get('/lists') 
    async listFilepath(@Res() res) {
        const lists = await this.filepathService.findAll() 
        return res.status(HttpStatus.OK).json({
            message: 'get list success',
            data: lists
        })
    }
}