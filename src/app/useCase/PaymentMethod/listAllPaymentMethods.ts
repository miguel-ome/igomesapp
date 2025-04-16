import { PaymentMethod } from '@app/entities/Payment/Payment';
import { PaymentMethodRepository } from '@app/repository/PaymentMethodRepository';
import { HttpStatus, Injectable } from '@nestjs/common';

interface ListAllPaymentMethodsUseCaseResponse {
  paymentMethods: PaymentMethod[];
  status: number;
  message: string;
}

@Injectable()
export class ListAllPaymentMethodsUseCase {
  constructor(private readonly repository: PaymentMethodRepository) {}

  public async execute(): Promise<ListAllPaymentMethodsUseCaseResponse> {
    const paymentMethods = await this.repository.listAllPaymentMethods();

    return {
      paymentMethods,
      status: HttpStatus.OK,
      message: 'Payment methods retrieved successfully.',
    };
  }
}
