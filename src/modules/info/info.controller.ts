import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { InfoService } from './info.service';
import { CreateInfoDto } from "./dto/create-info.dto";
@Controller('info')
export class InfoController {
    constructor(private infoService: InfoService ) {}
    @Post('/create') 
    async createInfo(@Res() res, @Body() createInfo: CreateInfoDto) {
        let createdInfo = await this.infoService.createInfo(createInfo)
        return res.status(HttpStatus.OK).json({
            message: 'Success', 
            data: createdInfo
        })
    }
    @Get('/lists')
    async getList(@Res() res) {
        let listInfo  = await this.infoService.findAll()
        return res.status(HttpStatus.OK).json({
            message: 'get lists success',
            data: listInfo
        })
    }
}
