import { Body, Controller, Get, HttpStatus, Next, Param, Post, Query, Res } from '@nestjs/common';
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
    @Get('/read-info')
    async getOneInfo(@Res() res, @Query('id') id) {
        let info = await this.infoService.findOne(id)
        return res.status(HttpStatus.OK).json({
            message: 'Get info and read it',
            data: info
        })
    }
    @Post('/download')
    async donwload(@Res() res, @Next() next, @Body() mailInfo) {
        let timeFile = `${new Date(mailInfo.date).getMonth() + 1}${new Date(
            mailInfo.date,
          ).getFullYear()}`;
        if(mailInfo.attachment) {
            let options = {
                root: process.env.PATH_SAVER + timeFile
            }
            return res.status(HttpStatus.OK).sendFile(`${mailInfo.attachment}`, options)
        }
        next()
    }
}
