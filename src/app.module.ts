import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffesController } from './coffes/coffes.controller';
import { CoffesService } from './coffes/coffes.service';
import { CoffesModule } from './coffes/coffes.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:    [CoffesModule, MongooseModule.forRoot("mongodb://localhost:27017/nest-course")],
  controllers:[AppController],
  providers:  [AppService],
})
export class AppModule {}
