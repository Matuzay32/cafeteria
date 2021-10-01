import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffesController } from './coffes.controller';
import { CoffesService } from './coffes.service';
import { Coffee } from './entities/coffe.entity';
import { Flavor } from './entities/flavor.entity';

//TODO: EJEMPLO DE CLASES

// //ejemplo de utilizacion de clases
// class ConfigService {}

// //ejemplo de utilizacion de clases

// class DevelopmentConfigService {}
// //ejemplo de utilizacion de clases

// class ProductionConfigService {}

//TODO: USANDO SERVICE FACTORY
// //Prueba de factory proveedores
// @Injectable()
// class CoffeBrandsFactory {
//   create() {
//     return ['buddy brew', 'nescafe'];
//   }
// }

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])], // Importo la tabla o entidad  con TypeOrmModule
  controllers: [CoffesController],
  providers: [
    CoffesService,
    // CoffeBrandsFactory,  // AGREGANDO EL CoffeBrandsFactory que use mas arriba
    {
      provide: COFFEE_BRANDS, // 👈 este es un provedor custom
      useFactory:async ()=> ['buddy brew', 'nescafe']

      //TODO:
      //Ejemplo 1   useFactory:() => ['buddy brew', 'nescafe'], // usa la siguientes variables que son del tipo string
      //TODO:
      //Ejemplo 2  useValue:()  ['buddy brew', 'nescafe'], // usa la siguientes variables que son del tipo string
      //TODO:
      //Ejemplo 3   useFactory: (brandsFactory:CoffeBrandsFactory) =>brandsFactory.create(), // En este ejemplo hace uso del service CoffeBrandsFactory y del metodo create
      //   inject:[CoffeBrandsFactory],// injecta el el servicio CoffeBrandsFactory

      //   useFactory: (brandsFactory: CoffeBrandsFactory) => brandsFactory.create(), // En este ejemplo hace uso del service CoffeBrandsFactory y del metodo create
      //   inject: [CoffeBrandsFactory], // injecta el el servicio CoffeBrandsFactory

      //TODO:
      //ejemplo de utilizacion de clases
      //   useClass:
      //     process.env.NODE_ENV === 'development'
      //       ? DevelopmentConfigService
      //       : ProductionConfigService,
    },
  ],
  exports: [CoffesService],
})
export class CoffesModule {}
