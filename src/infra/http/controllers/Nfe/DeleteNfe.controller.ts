import { DeleteNfeUseCase } from '@app/useCase/Nfe/deleteNfe.useCase';
import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('nfe')
export class DeleteNfeController {
  constructor(private deleteNfeUseCase: DeleteNfeUseCase) {}

  @Delete('/id_:id')
  async execute(@Param() params: { id: string }) {
    const { id } = params;

    const { message, status } = await this.deleteNfeUseCase.execute({
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
