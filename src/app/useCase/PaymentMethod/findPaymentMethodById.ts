import { PaymentMethod } from '@app/entities/Payment/Payment';
import { PaymentMethodRepository } from '@app/repository/PaymentMethodRepository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

interface FindPaymentMethodUseCaseRequest {
  id: string;
}

interface FindPaymentMethodUseCaseResponse {
  paymentMethod: PaymentMethod;
  status: number;
  message: string;
}

@Injectable()
export class FindPaymentMethodUseCase {
  constructor(private readonly repository: PaymentMethodRepository) {}

  public async execute({
    id,
  }: FindPaymentMethodUseCaseRequest): Promise<FindPaymentMethodUseCaseResponse> {
    if (!id) {
      throw new HttpException('ID não informado', HttpStatus.BAD_REQUEST);
    }

    const paymentMethod = await this.repository.findById(id);

    if (!paymentMethod) {
      throw new HttpException(
        'Método de pagamento não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      paymentMethod,
      status: HttpStatus.OK,
      message: 'Método de pagamento encontrado',
    };
  }
}
