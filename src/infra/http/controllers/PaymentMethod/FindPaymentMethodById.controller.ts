import { FindPaymentMethodUseCase } from '@app/useCase/PaymentMethod/findPaymentMethodById';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PaymentMethodViewModel } from '@infra/view-model/PaymentMethodModel';

@UseGuards(AuthGuard('jwt'))
@Controller('payment-method')
export class FindPaymentMethodsByIdController {
  constructor(private findPaymentMethodsUseCase: FindPaymentMethodUseCase) {}

  @Get('/id_:id')
  async execute(@Param() params: { id: string }) {
    const { id } = params;

    const { paymentMethod, message, status } =
      await this.findPaymentMethodsUseCase.execute({
        id,
      });

    return {
      status,
      body: {
        message,
        data: PaymentMethodViewModel.toHttp(paymentMethod),
      },
    };
  }
}
