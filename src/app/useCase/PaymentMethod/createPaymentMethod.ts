import { PaymentMethod } from '@app/entities/Payment/Payment';
import { PaymentMethodRepository } from '@app/repository/PaymentMethodRepository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

interface CreatePaymentMethodUseCaseRequest {
  name: string;
}

interface CreatePaymentMethodUseCaseResponse {
  status: number;
  message: string;
}

@Injectable()
export class CreatePaymentMethodUseCase {
  constructor(private createPaymentMethodRepository: PaymentMethodRepository) {}

  public async execute(
    request: CreatePaymentMethodUseCaseRequest,
  ): Promise<CreatePaymentMethodUseCaseResponse> {
    const { name } = request;

    if (!name) throw new Error('The name is empty');

    const paymentMethod = new PaymentMethod({ name });

    const paymentMethodExists =
      await this.createPaymentMethodRepository.findById(paymentMethod.id);

    if (paymentMethodExists)
      throw new HttpException(
        'Método de pagamento já existe',
        HttpStatus.CONFLICT,
      );

    await this.createPaymentMethodRepository.create(paymentMethod);

    return {
      status: HttpStatus.CREATED,
      message: 'Método de pagamento criado com sucesso',
    };
  }
}
