import { HttpModule, Module } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { ExcelController } from './excel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InfoSchema } from '../info/info.schema';

@Module({
  providers: [ExcelService],
  controllers: [ExcelController],
  imports: [HttpModule, MongooseModule.forFeature([{ name: 'info', schema: InfoSchema }])]
})
export class ExcelModule {}
