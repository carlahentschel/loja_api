import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

//integração do nest com o typeorm
@Injectable() //implementa TypeOrmOptionsFactory
export class PostgresConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {} //para acessar as variáveis de ambiente

  createTypeOrmOptions(): TypeOrmModuleOptions {
    //retorna um objeto (data source - fonte de dados)
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      entities: [__dirname + '/../**/*.entity{.js,.ts}'],
      //synchronize: true, - cria as tabelas automaticamente, só se usa
      //em ambientes de desenvolvimento, ambiente de produção pode dar problema
    };
  }
}
