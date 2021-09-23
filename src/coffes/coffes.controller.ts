import { Controller, Get, Param, Post , Body, HttpCode, HttpStatus, Patch, Delete, Query} from '@nestjs/common';
import { CoffesService } from './coffes.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffes')
export class CoffesController {
    constructor(private readonly coffesServices:CoffesService){}

    // @HttpCode(HttpStatus.OK)
    @Get()
    findAll(@Query()paginationQuery){
        // const {limit , offset } = paginationQuery;
        return this.coffesServices.findAll();
    }
    @Get(`:id`)
    findOne(@Param("id")id:string ){
        return this.coffesServices.findOne(id);
    }

    @Post()
    create(@Body()createCoffeeDto:CreateCoffeeDto ){
        console.log(createCoffeeDto instanceof CreateCoffeeDto)

        return this.coffesServices.create(createCoffeeDto );
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
