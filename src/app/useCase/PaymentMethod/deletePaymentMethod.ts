import { PaymentMethodRepository } from '@app/repository/PaymentMethodRepository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

interface DeletePaymentMethodUseCaseRequest {
  id: string;
}

interface DeletePaymentMethodUseCaseResponse {
  status: number;
  message: string;
}

@Injectable()
export class DeletePaymentMethodUseCase {
  constructor(private paymentMethodRepository: PaymentMethodRepository) {}

  public async execute(
    request: DeletePaymentMethodUseCaseRequest,
  ): Promise<DeletePaymentMethodUseCaseResponse> {
    const { id } = request;

    if (!id) throw new Error('The id is empty');

    const paymentMethodExists = await this.paymentMethodRepository.findById(id);

    if (!paymentMethodExists)
      throw new HttpException(
        'Método de pagamento não encontrado',
        HttpStatus.NOT_FOUND,
      );

    await this.paymentMethodRepository.delete(id);

    return {
      status: HttpStatus.CREATED,
      message: 'Método de pagamento excluido com sucesso',
    };
  }
}
