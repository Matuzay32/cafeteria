import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Patch,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
  SetMetadata,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CoffesService } from './coffes.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
@ApiTags("Coffees")
@Controller('coffes')
export class CoffesController {
  constructor(private readonly coffesServices: CoffesService) {}

  // @HttpCode(HttpStatus.OK)
  @Get()
  @Public() // este decorador utiliza  la guardia para que sea publica
  @ApiForbiddenResponse({description:"Forbideen"})// este decorador viene de Swagger
  findAll(@Protocol("https") protocol:string,@Query() paginationQuery: PaginationQueryDto) {
    console.log(protocol);
    return this.coffesServices.findAll(paginationQuery);
  }


  @Public() // este decorador utiliza  la guardia para que sea publica
  @ApiForbiddenResponse({description:"Forbideen"})// este decorador viene de Swagger
  @Get(`:id`)
  findOne(@Param('id',ParseIntPipe) id: string) {
    console.log(id)
    return this.coffesServices.findOne(id);
  }


  @Public() // este decorador utiliza  la guardia para que sea publica
  @Post()
  
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffesServices.create(createCoffeeDto);
  }

  @Public() // este decorador utiliza  la guardia para que sea publica
  @ApiForbiddenResponse({description:"Forbideen"})// este decorador viene de Swagger

  @Patch(':id')
  update(@Param('id') id: string, @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffesServices.update(id, updateCoffeeDto);
  }


  @Public() // este decorador utiliza  la guardia para que sea publica
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffesServices.remove(id);
  }
}
