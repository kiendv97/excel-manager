import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { responseCommon } from '../../common/response/cmResponse';
@Controller('excel')
export class ExcelController {
  constructor(private exelService: ExcelService) {}
  @Post('/getSheet/:id')
  async listSheet(@Res() res, @Body() body, @Param() params)  {
    let { id } = params;
    let {fileIndex} = body
    let result = await this.exelService.getSheets(id, fileIndex);
    return responseCommon(res, HttpStatus.OK, true, 'Success', 1, result);
  }
  @Post('/process-excel/:id')
  async processExcel(@Res() res, @Body() body, @Param() params) {
    let { id } = params;
    let {fileIndex, sheetName} = body
    let result = await this.exelService.processExcel(id, fileIndex, sheetName);
    return responseCommon(res, HttpStatus.OK, true, 'Success', 1, result);
  }
}
