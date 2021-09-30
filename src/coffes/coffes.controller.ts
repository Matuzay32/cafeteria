import { Controller, Get, Param, Post , Body, HttpCode, HttpStatus, Patch, Delete, Query} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CoffesService } from './coffes.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffes')
export class CoffesController {
    constructor(private readonly coffesServices:CoffesService){}

    // @HttpCode(HttpStatus.OK)
    @Get()
    findAll(@Query()paginationQuery:PaginationQueryDto){
        
        return this.coffesServices.findAll(paginationQuery);
    }
    @Get(`:id`)
    findOne(@Param("id")id:string ){
        return this.coffesServices.findOne(id);
    }

    @Post()
    create(@Body()createCoffeeDto:CreateCoffeeDto ){
        return this.coffesServices.create(createCoffeeDto);
    }
    @Patch(":id")
    update(@Param("id") id:string,@Body() updateCoffeeDto:UpdateCoffeeDto){

        return this.coffesServices.update(id,updateCoffeeDto);
    }
    @Delete(":id")
    remove(@Param("id") id:string){

        return this.coffesServices.remove(id);
    }
}
