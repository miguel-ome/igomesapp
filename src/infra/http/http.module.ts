import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { UserController } from './controllers/UserController';
import { CreateUserUseCase } from '@app/useCase/User/createUser.useCase';
import { ListAllUsersUseCase } from '@app/useCase/User/listAllUsers.useCase';
import { FindUserByLoginUseCase } from '@app/useCase/User/findUserByLogin.useCase';
import { DeleteUserUseCase } from '@app/useCase/User/deleteUser.useCase';
import { UpdateUserUseCase } from '@app/useCase/User/updateUser.useCase';
import { FindUserByIdUseCase } from '@app/useCase/User/findUserById.useCase';
import { LoginController } from './controllers/LoginController';
import { JwtModule } from '@nestjs/jwt';
import { AuthUseCase } from '@app/useCase/Auth/auth.useCase';
import { JwtStrategy } from '@app/useCase/Auth/jwtStrategy.useCase';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET as string,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [UserController, LoginController],
  providers: [
    CreateUserUseCase,
    DeleteUserUseCase,
    FindUserByLoginUseCase,
    FindUserByIdUseCase,
    ListAllUsersUseCase,
    UpdateUserUseCase,
    AuthUseCase,
    JwtStrategy,
  ],
})
export class HttpModule {}
