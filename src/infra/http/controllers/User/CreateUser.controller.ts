import { CreateUserUseCase } from '@app/useCase/User/createUser.useCase';
import { CreateUserDTO } from '@infra/http/dto/User/CreateUserDTO';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
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
