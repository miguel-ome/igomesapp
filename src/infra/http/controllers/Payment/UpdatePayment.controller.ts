import { UpdatePaymentUseCase } from '@app/useCase/Payment/updatePayment.useCase';
import { UpdatePaymentDTO } from '@infra/http/dto/Payment/UpdatePaymentDTO';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('payment')
export class UpdatePaymentController {
  constructor(private updatePaymentUseCase: UpdatePaymentUseCase) {}

  @Post()
  async execute(@Body() request: UpdatePaymentDTO) {
    const { message, status } =
      await this.updatePaymentUseCase.execute(request);

    return {
      status,
      body: {
        message,
      },
    };
  }
}
