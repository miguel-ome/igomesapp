import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
    const { status, message } = await this.createUserUseCase.execute({
      login,
      name,
      password,
    });

    return {
      status,
      body: {
        message,
      },
    };
  }

  @Get()
  async listAllUsers() {
    const { message, status, users } = await this.listAllUsersUseCase.execute();

    return {
      status,
      body: {
        message,
        data: users.map((user) => UserViewModel.toHttp(user)),
      },
    };
  }

  @Get(':id/:login')
  async findUserByLogin(@Param() params: { id: string; login: string }) {
    return `Estes são os parametros: ${params.id}: id \n ${params.login}: login`;
  }
}
