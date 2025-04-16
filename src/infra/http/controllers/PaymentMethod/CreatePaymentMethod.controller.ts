import { CreatePaymentMethodUseCase } from '@app/useCase/PaymentMethod/createPaymentMethod';
import { CreatePaymentMethodDTO } from '@infra/http/dto/PaymentMethod/CreatePaymentMethod.DTO';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('payment-method')
export class CreatePaymentMethodController {
  constructor(private createPaymentMethodUseCase: CreatePaymentMethodUseCase) {}

  @Post()
  async execute(@Body() body: CreatePaymentMethodDTO) {
    const { name } = body;
    const { status, message } = await this.createPaymentMethodUseCase.execute({
      name,
    });

    return {
      status,
      body: {
        message,
      },
    };
  }
}
