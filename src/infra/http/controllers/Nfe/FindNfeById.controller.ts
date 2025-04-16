import { FindNfeByIdUseCase } from '@app/useCase/Nfe/findNfeById.useCase';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('nfe')
export class FindNfeByIdController {
  constructor(private findNfeByIdUseCase: FindNfeByIdUseCase) {}

  @Get('/id_:id')
  async deleteUser(@Param() params: { id: string }) {
    const { id } = params;

    const { message, status } = await this.findNfeByIdUseCase.execute({
      id,
    });

    return {
      status,
      body: {
        message,
      },
    };
  }
}
