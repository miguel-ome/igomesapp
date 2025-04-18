import { DeletePaymentUseCase } from '@app/useCase/Payment/deletePaymente.useCase';
import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('payment')
export class DeletePaymentController {
  constructor(private deletePaymentUseCase: DeletePaymentUseCase) {}

  @Delete('/id_:id')
  async execute(@Param() params: { id: string }) {
    const { id } = params;

    const { message, status } = await this.deletePaymentUseCase.execute({
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
