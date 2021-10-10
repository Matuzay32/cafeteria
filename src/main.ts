import { ValidationPipe } from '@nestjs/common'; // utilizo el validation Pipe para hacer validaciones
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';



async function bootstrap() {


  
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ // Global pipes  es una validacion global
      whitelist: true, // Solamente acepta las propiedades que estan en el DTO
      forbidNonWhitelisted: true, //Esto sirve para detener el proceso de la app para cuando se envia una propieda que no esta en la lista
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter()); // esto es para aplicar filtros globales
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(), // interceptor de tiempo si la solicitud pasa determinado tiempo va lanzar un error
  ); //Esto ejecuta los interceptors de manera global

  //app.useGlobalGuards(new ApiKeyGuard()); // esto es para aplicar guard globales


  const options = new DocumentBuilder()
  .setTitle('CAFETERIA')
  .setDescription('Coffee application ')
  .setVersion('1.0')
  .build();

const document = SwaggerModule.createDocument(app, options);

SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
