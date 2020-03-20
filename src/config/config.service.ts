import { Injectable } from '@nestjs/common';
import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  AuthOptionsFactory,
  AuthOptions,
} from './contracts/auth-options-factory.contract';

@Injectable()
export class ConfigService
  implements TypeOrmOptionsFactory, JwtOptionsFactory, AuthOptionsFactory {
  createAuthOptions(): AuthOptions {
    return {
      enabled: process.env['AUTH_ENABLED'] != 'false',
    };
  }

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: process.env['JWT_SECRET'] || 'secret',
    };
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: process.env['DB_HOST'] || 'localhost',
      port: ((process.env['DB_PORT'] as any) as number) || 3306,
      username: process.env['DB_USERNAME'] || 'root',
      password: process.env['DB_PASSWORD'] || 'root',
      database: process.env['DB_SCHEMA'] || 'main',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: 'all',
    };
  }
}
