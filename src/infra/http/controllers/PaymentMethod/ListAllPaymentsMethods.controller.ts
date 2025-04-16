import { ListAllPaymentMethodsUseCase } from '@app/useCase/PaymentMethod/listAllPaymentMethods';
import { PaymentMethodViewModel } from '@infra/view-model/PaymentMethodModel';
import { UserViewModel } from '@infra/view-model/UserViewModels';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('payment-method')
export class ListAllPaymentsMethodsController {
  constructor(
    private listAllPaymentMethodUseCase: ListAllPaymentMethodsUseCase,
  ) {}

  @Get()
  async execute() {
    const { message, status, paymentMethods } =
      await this.listAllPaymentMethodUseCase.execute();

    return {
      status,
      body: {
        message,
        data: paymentMethods.map((paymentMethods) =>
          PaymentMethodViewModel.toHttp(paymentMethods),
        ),
      },
    };
  }
}
