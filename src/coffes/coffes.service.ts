import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffe.entity';

@Injectable()
export class CoffesService {
  constructor(){}
    private coffees:Coffee[] = [
        {
            id:1,
            name:"super caffe",
            brand:"caffe colombiano",
            flavors:["chocolate","vainilla"]
        },];
        
        
  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    const coffe= this.coffees.find(item => item.id === +id);
    if(!coffe){
        throw new NotFoundException(`El caffe que quiere no se encuentra disponible con el codigo  ${id}`);
    }
    return coffe;
  }

  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);
  }

  update(id: string, updateCoffeeDto: any) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      // update the existing entity
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex(item => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
