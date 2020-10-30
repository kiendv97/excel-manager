import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FilepathModule } from './modules/filepath/filepath.module';
import { FilepathController } from './modules/filepath/filepath.controller';
import { InfoModule } from './modules/info/info.module';
import { ScheduleModule } from "@nestjs/schedule";
import { CronService } from './modules/cron/cron.service';
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/excel'),
  ScheduleModule.forRoot(),
    FilepathModule,
    InfoModule],
  controllers: [AppController, FilepathController],
  providers: [AppService, CronService],

})
export class AppModule { }
