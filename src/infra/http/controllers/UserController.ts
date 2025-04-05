import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from '../dto/user/CreateUserDTO';
import { CreateUserUseCase } from '@app/useCase/User/createUser.useCase';
import { UserViewModel } from '../../view-model/UserViewModels';
import { ListAllUsersUseCase } from '@app/useCase/User/listAllUsers.useCase';
import { DeleteUserUseCase } from '@app/useCase/User/deleteUser.useCase';
import { FindUserByIdUseCase } from '@app/useCase/User/findUserById.useCase';
import { FindUserByLoginUseCase } from '@app/useCase/User/findUserByLogin.useCase';
import { UpdateUserUseCase } from '@app/useCase/User/updateUser.useCase';
import { UpdateUserDTO } from '../dto/user/UpdateUserDTO';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private listAllUsersUseCase: ListAllUsersUseCase,
    private findUserByIdUseCase: FindUserByIdUseCase,
    private findUserByLoginUseCase: FindUserByLoginUseCase,
  ) {}

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

  @Delete('/id_:id')
  async deleteUser(@Param() params: { id: string }) {
    const { id } = params;

    const { message, status } = await this.deleteUserUseCase.execute({ id });

    return {
      status,
      body: {
        message,
      },
    };
  }

  @Patch('/id_:id')
  async updateUser(
    @Param() params: { id: string },
    @Body() body: UpdateUserDTO,
  ) {
    const { id } = params;
    const { login, name } = body;

    const { message, status } = await this.updateUserUseCase.execute({
      id,
      login,
      name,
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

  @Get('/id_:id')
  async findUserById(@Param() params: { id: string }) {
    const { id } = params;

    const { user, message, status } = await this.findUserByIdUseCase.execute({
      id,
    });

    return {
      status,
      body: {
        message,
        data: UserViewModel.toHttp(user),
      },
    };
  }

  @Get('/login_:login')
  async findUserByLogin(@Param() params: { login: string }) {
    const { login } = params;

    const { user, message, status } = await this.findUserByLoginUseCase.execute(
      {
        login,
      },
    );

    return {
      status,
      body: {
        message,
        data: UserViewModel.toHttp(user),
      },
    };
  }
}
