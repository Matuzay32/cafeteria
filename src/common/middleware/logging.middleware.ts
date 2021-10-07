import {
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.time('Tiempo de solicitud');
    console.log('Soy un middleWare logging middleware!');
    
    res.on('finish', () => console.timeEnd('Tiempo de solicitud'));
    next(); 
  }
}