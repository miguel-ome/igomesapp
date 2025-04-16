import { DeletePaymentMethodUseCase } from '@app/useCase/PaymentMethod/deletePaymentMethod';
import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('payment-method')
export class DeletePaymentMethodController {
  constructor(private deletePaymentMethodUseCase: DeletePaymentMethodUseCase) {}

  @Delete('/id_:id')
  async execute(@Param() params: { id: string }) {
    const { id } = params;
    const { status, message } = await this.deletePaymentMethodUseCase.execute({
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
