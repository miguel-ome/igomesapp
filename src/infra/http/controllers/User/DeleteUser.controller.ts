import { DeleteUserUseCase } from '@app/useCase/User/deleteUser.useCase';
import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

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
}
