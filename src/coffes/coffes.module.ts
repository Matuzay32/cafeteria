import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffesController } from './coffes.controller';
import { CoffesService } from './coffes.service';
import { Coffee } from './entities/coffe.entity';
import { Flavor } from './entities/flavor.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])], // Importo la tabla o entidad  con TypeOrmModule
  controllers: [CoffesController],
  providers: [
    CoffesService,
    {
      provide: COFFEE_BRANDS, // 👈
      useValue: ['buddy brew', 'nescafe'],
    },
  ],
  exports: [CoffesService],
})
export class CoffesModule {}
