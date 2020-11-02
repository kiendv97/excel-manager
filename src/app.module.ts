import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FilepathModule } from './modules/filepath/filepath.module';
import { FilepathController } from './modules/filepath/filepath.controller';
import { InfoModule } from './modules/info/info.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './modules/cron/cron.service';
import { ConfigModule } from '@nestjs/config';
import { CronModule } from './modules/cron/cron.module';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_HOST),
    FilepathModule,
    InfoModule,
    CronModule,
  ],
  controllers: [AppController, FilepathController],
  providers: [AppService, CronService],
  exports: [FilepathModule, InfoModule],
})
export class AppModule {}