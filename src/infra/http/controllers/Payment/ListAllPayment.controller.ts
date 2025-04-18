import { ListAllPaymentUseCase } from '@app/useCase/Payment/listAllPayment.useCase';
import { PaymentViewModel } from '@infra/view-model/PaymentViewModel';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('payment')
export class ListAllPaymentController {
  constructor(private listAllPaymentUseCase: ListAllPaymentUseCase) {}

  @Get()
  async execute() {
    const { message, status, listPayment } =
      await this.listAllPaymentUseCase.execute();

    return {
      status,
      body: {
        message,
        data: listPayment.map((payment) => PaymentViewModel.toHttp(payment)),
      },
    };
  }
}
