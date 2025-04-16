import { UpdatePaymentMethodUseCase } from '@app/useCase/PaymentMethod/updatePaymentMethod';
import { UpdateUserDTO } from '@infra/http/dto/User/UpdateUserDTO';
import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('payment-method')
export class UpdatePaymentMethodController {
  constructor(private updatePaymentMethodUseCase: UpdatePaymentMethodUseCase) {}

  @Patch('/id_:id')
  async execute(@Param() params: { id: string }, @Body() body: UpdateUserDTO) {
    const { id } = params;
    const { name } = body;

    const { message, status } = await this.updatePaymentMethodUseCase.execute({
      id,
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
