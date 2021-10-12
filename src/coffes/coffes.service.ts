import { HttpException, HttpStatus, Injectable, NotFoundException,HttpCode } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffe.entity';

@Injectable()
export class CoffesService {
  constructor(
    @InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>,
  ) {}
    
        
        
 async  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return await this.coffeeModel
      .find()
      .skip(offset)
      .limit(limit)
      .exec();
  }

 async  findOne(id: string) {
    // const coffe= this.coffees.find(item => item.id === +id);
    // if(!coffe){
    //     throw new NotFoundException(`El caffe que quiere no se encduentra disponible con el codigo  ${id}`);
    // }
     const coffe= await this.coffeeModel.findOne({_id:id}).exec()

     if(!coffe){
        throw new NotFoundException(`El caffe que quiere no se encduentra disponible con el codigo  ${id}`);

     }
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const coffe =this.coffeeModel.create(createCoffeeDto);
        return (await coffe).save(); 
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = await this.coffeeModel
      .findOneAndUpdate({ _id: id }, { $set: updateCoffeeDto }, { new: true })
      .exec();

    if (!existingCoffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return existingCoffee;
  }
  async remove(id: string) {
    const coffee = await this.coffeeModel.findByIdAndDelete(id);
    return coffee;
  }
}