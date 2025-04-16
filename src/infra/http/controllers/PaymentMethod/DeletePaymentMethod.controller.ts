import { DeletePaymentMethodUseCase } from '@app/useCase/PaymentMethod/DeletePaymentMethod';
import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('payment-methods')
export class DeletePaymentMethodController {
  constructor(private deletePaymentMethodUseCase: DeletePaymentMethodUseCase) {}

  @Delete('/id_:id')
  async DeletePaymentMethod(@Param() params: { id: string }) {
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
