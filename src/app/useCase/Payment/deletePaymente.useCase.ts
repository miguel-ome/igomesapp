import { PaymentRepository } from '@app/repository/PaymentRepository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

interface DeletePaymenteUseCaseRequest {
  id: string;
}

interface DeletePaymenteUseCaseResponse {
  status: number;
  message: string;
}

@Injectable()
export class DeletePaymentUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute(
    request: DeletePaymenteUseCaseRequest,
  ): Promise<DeletePaymenteUseCaseResponse> {
    const { id } = request;

    // Validar se o pagamento existe
    const payment = await this.paymentRepository.findById(id);
    if (!payment)
      throw new HttpException('Pagamento não encontrado', HttpStatus.NOT_FOUND);

    // Deletar o pagamento
    await this.paymentRepository.delete(id);

    return {
      status: HttpStatus.OK,
      message: 'Pagamento deletado com sucesso',
    };
  }
}
