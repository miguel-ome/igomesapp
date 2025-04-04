import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { UserController } from './controllers/UserController';
import { CreateUserUseCase } from '@app/useCase/User/createUser.useCase';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [CreateUserUseCase],
})
export class HttpModule {}
