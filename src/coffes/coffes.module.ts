import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoffesController } from './coffes.controller';
import { CoffesService } from './coffes.service';
import { Coffee, CoffeeSchema } from './entities/coffe.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Coffee.name,
        schema: CoffeeSchema,
      },
    ]),
  ],
  controllers: [CoffesController],
  providers: [CoffesService],
})
export class CoffesModule {}
