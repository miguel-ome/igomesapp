import { Payment } from '@app/entities/Payment/Payment';
import { NfeRepository } from '@app/repository/NfeRepository';
import { PaymentMethodRepository } from '@app/repository/PaymentMethodRepository';
import { PaymentRepository } from '@app/repository/PaymentRepository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

interface CreatePaymenteUseCaseRequest {
  idPaymentMethod: string;
  idNf?: string;
  dueDate: Date;
  emissionDate: Date;
  receivedDate?: Date;
  value: number;
}

interface CreatePaymenteUseCaseResponse {
  status: number;
  message: string;
}

@Injectable()
export class CreatePaymentUseCase {
  constructor(
    private paymentRepository: PaymentRepository,
    private paymentMethodRepository: PaymentMethodRepository,
    private nfeRepository: NfeRepository,
  ) {}

  async execute(
    request: CreatePaymenteUseCaseRequest,
  ): Promise<CreatePaymenteUseCaseResponse> {
    const {
      dueDate,
      emissionDate,
      idPaymentMethod,
      value,
      idNf,
      receivedDate,
    } = request;

    // Validar se os campos obrigatórios estão preenchidos
    if (!idPaymentMethod || !dueDate || !emissionDate || !value) {
      throw new HttpException(
        'Preencha todos os campos obrigatórios',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Validar se o método de pagamento informado existe
    if (!(await this.paymentMethodRepository.findById(idPaymentMethod)))
      throw new HttpException(
        'Método de pagamento inválido',
        HttpStatus.BAD_REQUEST,
      );

    // Validar se a data de emissão é posterior à data de vencimento
    if (emissionDate > dueDate) {
      throw new HttpException(
        'Data de vencimento não pode ser anterior à data de emissão',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Validar se o value é maior que zero
    if (value <= 0)
      throw new HttpException(
        'Valor menor ou igual a zero',
        HttpStatus.BAD_REQUEST,
      );

    // Validar se a nota fiscal existe, se o idNf for informado
    if (idNf && !(await this.nfeRepository.findNfeById(idNf)))
      throw new HttpException(
        'Nota fiscal não encontrada',
        HttpStatus.BAD_REQUEST,
      );

    const payment = new Payment({
      dueDate,
      emissionDate,
      idPaymentMethod,
      value,
      idNf,
      receivedDate,
    });

    await this.paymentRepository.create(payment);

    return {
      status: HttpStatus.CREATED,
      message: 'Pagamento criado com sucesso',
    };
  }
}
