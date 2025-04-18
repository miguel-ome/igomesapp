import { CreatePaymentUseCase } from '@app/useCase/Payment/createPayment.useCase';
import { CreatePaymentDTO } from '@infra/http/dto/Payment/CreatePaymentDTO';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('payment')
export class CreatePaymentController {
  constructor(private createPaymentUseCase: CreatePaymentUseCase) {}

  @Post()
  async execute(@Body() request: CreatePaymentDTO) {
    const { message, status } =
      await this.createPaymentUseCase.execute(request);

    return {
      status,
      body: {
        message,
      },
    };
  }
}
