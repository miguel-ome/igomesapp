import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { FindUserByLoginUseCase } from '@app/useCase/User/findUserByLogin.useCase';
import { AuthGuard } from '@nestjs/passport';
import { UserViewModel } from '@infra/view-model/UserViewModels';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class FindUserByLoginController {
  constructor(private findUserByLoginUseCase: FindUserByLoginUseCase) {}

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
