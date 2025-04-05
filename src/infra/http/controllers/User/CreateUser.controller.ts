import { CreateUserUseCase } from '@app/useCase/User/createUser.useCase';
import { CreateUserDTO } from '@infra/http/dto/user/CreateUserDTO';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('user')
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  async createUser(@Body() body: CreateUserDTO) {
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
}
