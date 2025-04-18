import { Payment } from '@app/entities/Payment/Payment';
import { HttpException, HttpStatus } from '@nestjs/common';

interface FindPaymentByIdUseCaseRequest {
  id: string;
}

interface FindPaymentByIdUseCaseResponse {
  status: number;
  message: string;
  payment: Payment;
}

export class FindPaymentByIdUseCase {
  constructor(private readonly paymentRepository: any) {}

  async execute(
    request: FindPaymentByIdUseCaseRequest,
  ): Promise<FindPaymentByIdUseCaseResponse> {
    const { id } = request;

    // Validar se o ID foi informado
    if (!id)
      throw new HttpException('O ID não foi informado', HttpStatus.BAD_REQUEST);

    // Validar se o pagamento existe
    const payment = await this.paymentRepository.findById(id);
    if (!payment) {
      throw new Error('Pagamento não encontrado');
    }

    return {
      status: HttpStatus.OK,
      message: 'Pagamento encontrado com sucesso',
      payment,
    };
  }
}
