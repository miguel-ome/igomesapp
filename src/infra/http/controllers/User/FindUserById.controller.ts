import { FindUserByIdUseCase } from '@app/useCase/User/findUserById.useCase';
import { UserViewModel } from '@infra/view-model/UserViewModels';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('user')
export class FindUserByIdController {
  constructor(private findUserByIdUseCase: FindUserByIdUseCase) {}

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
}
