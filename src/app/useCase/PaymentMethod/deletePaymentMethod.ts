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
  constructor(private deletePaymentMethodRepository: PaymentMethodRepository) {}

  public async execute(
    request: DeletePaymentMethodUseCaseRequest,
  ): Promise<DeletePaymentMethodUseCaseResponse> {
    console.log('Repo:', this.deletePaymentMethodRepository);

    const { id } = request;

    if (!id) throw new Error('The id is empty');

    const paymentMethodExists =
      await this.deletePaymentMethodRepository.findById(id);

    if (!paymentMethodExists)
      throw new HttpException(
        'Método de pagamento não encontrado',
        HttpStatus.NOT_FOUND,
      );

    await this.deletePaymentMethodRepository.delete(id);

    return {
      status: HttpStatus.CREATED,
      message: 'Método de pagamento excluido com sucesso',
    };
  }
}
