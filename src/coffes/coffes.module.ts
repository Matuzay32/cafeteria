import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffesController } from './coffes.controller';
import { CoffesService } from './coffes.service';
import { Coffee } from './entities/coffe.entity';
import { Flavor } from './entities/flavor.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Coffee,Flavor
    ])],// Importo la tabla o entidad  con TypeOrmModule 
    controllers:[CoffesController],
    providers:[CoffesService]})
export class CoffesModule {}
