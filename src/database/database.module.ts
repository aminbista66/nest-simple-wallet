import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
              type: 'postgres',
              host: configService.getOrThrow('DB_HOST'),
              username: configService.getOrThrow('DB_USERNAME'),
              password: configService.getOrThrow('DB_PASSWORD'),
              port: configService.getOrThrow('DB_PORT'),
              database: configService.getOrThrow("DB_NAME"),
              autoLoadEntities: true,
              synchronize: false,
            }),
          }),
    ]
})
export class DatabaseModule {}