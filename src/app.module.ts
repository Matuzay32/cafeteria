import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffesController } from './coffes/coffes.controller';
import { CoffesService } from './coffes/coffes.service';
import { CoffesModule } from './coffes/coffes.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:    [CoffesModule,
    TypeOrmModule.forRoot({ // el for root para traer toda la base de datos globalmente
      type: 'postgres', // type of our database
      host: 'localhost', // database host
      port: 5432, // database host
      username: 'postgres', // username
      password: 'matuzay32', // user password
      database: 'postgres', // name of our database,
      autoLoadEntities: true, // models will be loaded automatically 
      synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
    }),],
  controllers:[AppController],
  providers:  [AppService],
})
export class AppModule {}
