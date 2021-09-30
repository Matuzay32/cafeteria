import { ValidationPipe } from '@nestjs/common'; // utilizo el validation Pipe para hacer validaciones 
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist:true,// solamente acepta las propiedades que estan en el DTO
      forbidNonWhitelisted:true, //esto sirve para detener el proceso de la app para cuando se envia una propieda que no esta en la lista
      transform: true,
      transformOptions:{
        enableImplicitConversion: true
      }
 }))
  await app.listen(3000);
}
bootstrap();
