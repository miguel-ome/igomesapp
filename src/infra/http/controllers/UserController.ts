import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from '../dto/CreateUserDTO';
import { CreateUserUseCase } from '@app/useCase/User/createUser.useCase';
import { UserViewModel } from '../../view-model/UserViewModels';
import { ListAllUsersUseCase } from '@app/useCase/User/listAllUsers.useCase';

@Controller('user')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private listAllUsersUseCase: ListAllUsersUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateUserDTO) {
    const { login, name, password } = body;
    const { user } = await this.createUserUseCase.execute({
      login,
      name,
      password,
    });

    return {
      status: 201,
      body: {
        message: 'Usuário criado com sucesso',
      },
    };
  }

  @Get()
  async listAllUsers() {
    const { users } = await this.listAllUsersUseCase.execute();

    return {
      status: 201,
      body: {
        message: 'Usuários listados com sucesso',
        data: users.map((user) => UserViewModel.toHttp(user)),
      },
    };
  }
}
