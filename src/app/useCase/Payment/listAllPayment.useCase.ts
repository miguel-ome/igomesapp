import { Payment } from '@app/entities/Payment/Payment';
import { PaymentRepository } from '@app/repository/PaymentRepository';
import { Injectable } from '@nestjs/common';

// interface ListAllPaymentUseCaseRequest {}

interface ListAllPaymentUseCaseResponse {
  status: number;
  message: string;
  listPayment: Payment[];
}

@Injectable()
export class ListAllPaymentUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute(): Promise<ListAllPaymentUseCaseResponse> {
    const listPayment = await this.paymentRepository.listAllPayments();

    if (listPayment.length === 0) {
      return {
        status: 204,
        message: 'Nenhum registro encontrado',
        listPayment: [],
      };
    }

    return {
      status: 200,
      message: 'Lista de pagamentos enviado com sucesso',
      listPayment,
    };
  }
}
