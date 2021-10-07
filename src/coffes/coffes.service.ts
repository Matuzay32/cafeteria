import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  HttpCode,
  Inject,
  Scope,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Event } from 'src/events/entities/event.entity';
import { Connection, Repository } from 'typeorm'; // utilizo esta libreria para inyectar el modelo
import { COFFEE_BRANDS } from './coffees.constants';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffe.entity';
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class CoffesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly connection: Connection,
    private readonly configService: ConfigService,
    
  ) {
    const coffeesConfig = this.configService.get('coffees');
    console.log(coffeesConfig);
  }

async   findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    
    return await this.coffeeRepository.find({
      relations: ['flavors'], // utilizo la relacion  flavors y pide un array de las relaciones
      skip: offset, // esta propiedad es propia del find TypeORM  esta propiedad salta la cantidad de elementos que se le indica por ejemplo si se pone 3
      // se saltaran los 3 primeros elementos trayendo el resto de ellos
      take: limit, // esta propiedad es propia del find TypeORM   esta propiedad limit hace que se traiga la cantidad de elementos que se le indique
    });
  }

  async findOne(id: string) {
    const coffee = await this.coffeeRepository.findOne(id, {
      relations: ['flavors'], // utilizo la relacion  flavors y pide un array de las relaciones
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((favors) => this.preloadFlavorByName(favors)),
    );

    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
      ));

    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} no encontrado`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }

  // Esta fucnion checquea si existe el gusto si existe devuelve que existe
  // Si no existe lo crea en la tabla flavors el gusto en cuestion
  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({ name });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({ name });
  }

  async recommendCoffee(coffee: Coffee) {
    //transacciones de bases de datos
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      coffee.recommendations++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: coffee.id };

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
