import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilepathModule } from '../filepath/filepath.module';
import { FilepathSchema } from '../filepath/filepath.schema';
import { FilepathService } from '../filepath/filepath.service';
import { InfoModule } from '../info/info.module';
import { InfoSchema } from '../info/info.schema';
import { InfoService } from '../info/info.service';
import { CronService } from './cron.service';

@Module({
    providers: [CronService, FilepathService, InfoService],
    // exports: [CronService],
    imports: [MongooseModule.forFeature([{name: 'filepath', schema: FilepathSchema},{name:'info', schema: InfoSchema}]), InfoModule]
})
export class CronModule {}
