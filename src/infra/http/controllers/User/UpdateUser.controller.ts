import { UpdateUserUseCase } from '@app/useCase/User/updateUser.useCase';
import { UpdateUserDTO } from '@infra/http/dto/user/UpdateUserDTO';
import { Body, Controller, Param, Patch } from '@nestjs/common';

@Controller('user')
export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

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
}
