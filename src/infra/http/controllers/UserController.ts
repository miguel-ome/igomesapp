import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from '../dto/CreateUserDTO';
import { CreateUserUseCase } from '@app/useCase/User/createUser.useCase';
import { UserViewModel } from '../../view-model/UserViewModels';

@Controller('user')
export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

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
        data: UserViewModel.toHttp(user),
      },
    };
  }
}
