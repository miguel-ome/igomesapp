import { PaymentMethodRepository } from '@app/repository/PaymentMethodRepository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

interface UpdatePaymentMethodUseCaseRequest {
  id: string;
  name: string;
}

interface UpdatePaymentMethodUseCaseResponse {
  status: number;
  message: string;
}

@Injectable()
export class UpdatePaymentMethodUseCase {
  constructor(private paymentMethodRepository: PaymentMethodRepository) {}

  public async execute(
    request: UpdatePaymentMethodUseCaseRequest,
  ): Promise<UpdatePaymentMethodUseCaseResponse> {
    const { id, name } = request;

    if (!id || !name) {
      throw new HttpException(
        'ID e nome são obrigatórios',
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingPaymentMethod =
      await this.paymentMethodRepository.findById(id);

    if (!existingPaymentMethod) {
      throw new HttpException(
        'Método de pagamento não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    // Atualiza os dados
    existingPaymentMethod.update({ name });

    await this.paymentMethodRepository.save(existingPaymentMethod);

    return {
      status: HttpStatus.OK,
      message: 'Método de pagamento atualizado com sucesso',
    };
  }
}
