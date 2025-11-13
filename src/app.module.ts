import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'password123',
      database: 'nest_crud_api',

      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Mude para true para desenvolvimento
    }),
    TasksModule,
  ]
})
export class AppModule {}
