import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffesController } from './coffes/coffes.controller';
import { CoffesService } from './coffes/coffes.service';
import { CoffesModule } from './coffes/coffes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import appConfig from './app.config';

@Module({
  imports: [
    CoffesModule,
    // El ConfigModule es interno de nestjs     : Esto lo utilizo para usar el archibo env

    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        // esto es para hacerlo con el env

        // el for root para traer toda la base de datos globalmente
       /*  type: 'postgres', // type of our database
        host: process.env.DATABASE_HOST, // database host
        port: +process.env.DATABASE_PORT, // database host
        username: process.env.DATABASE_USER, // username
        password: process.env.DATABASE_PASSWORD, // user password
        database: process.env.DATABASE_NAME, // name of our database,
        autoLoadEntities: true, // models will be loaded automatically
        synchronize: true, // your entities will be synced with the database(recommended: disable in prod) */

        //esto es para hacerlo de manera manual

        type: 'postgres', // type of our database
        host: "localhost", // database host
        port: 5432, // database host
        username: "postgres", // username
        password: "matuzay32", // user password
        database: "postgres", // name of our database,
        autoLoadEntities: true, // models will be loaded automatically
        synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
      }),
    }),
    ConfigModule.forRoot({ load: [appConfig] }),
    CoffeeRatingModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
