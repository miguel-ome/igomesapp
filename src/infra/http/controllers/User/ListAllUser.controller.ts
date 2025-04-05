import { ListAllUsersUseCase } from '@app/useCase/User/listAllUsers.useCase';
import { UserViewModel } from '@infra/view-model/UserViewModels';
import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

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
}
