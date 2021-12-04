import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Para acessar o modo playground, acesse a rota /graphql.';
  }
}
