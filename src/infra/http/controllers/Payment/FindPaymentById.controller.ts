import { FindPaymentByIdUseCase } from '@app/useCase/Payment/findPaymentById.useCase';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('payment')
export class FindPaymentByIdController {
  constructor(private findPaymentByIdUseCase: FindPaymentByIdUseCase) {}

  @Get('/id_:id')
  async execute(@Param() params: { id: string }) {
    const { id } = params;

    const { message, status } = await this.findPaymentByIdUseCase.execute({
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
