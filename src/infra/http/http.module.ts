import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { UserController } from './controllers/UserController';
import { CreateUserUseCase } from '@app/useCase/User/createUser.useCase';
import { ListAllUsersUseCase } from '@app/useCase/User/listAllUsers.useCase';
import { FindUserByLoginUseCase } from '@app/useCase/User/findUserByLogin.useCase';
import { DeleteUserUseCase } from '@app/useCase/User/deleteUser.useCase';
import { UpdateUserUseCase } from '@app/useCase/User/updateUser.useCase';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    DeleteUserUseCase,
    FindUserByLoginUseCase,
    ListAllUsersUseCase,
    UpdateUserUseCase,
  ],
})
export class HttpModule {}
