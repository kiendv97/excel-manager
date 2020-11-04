import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { InfoService } from './info.service';
import { InfoController } from './info.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InfoSchema } from './info.schema';
import { LoggerMiddleware } from 'src/shared/logger.middleware';

@Module({
  providers: [InfoService],
  controllers: [InfoController],
  exports: [InfoService],
  imports: [MongooseModule.forFeature([{ name: 'info', schema: InfoSchema }])],
})
export class InfoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('infos');
  }
}
