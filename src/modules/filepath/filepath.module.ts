import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilepathController } from './filepath.controller';
import { FilepathSchema } from './filepath.schema';
import { FilepathService } from './filepath.service';

@Module({
  providers: [FilepathService],
  exports: [FilepathService],
  controllers: [FilepathController],
  imports: [MongooseModule.forFeature([{name: 'filepath', schema: FilepathSchema}])]
})
export class FilepathModule {}
