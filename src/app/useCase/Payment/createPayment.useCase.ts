import { Nfe } from '@app/entities/Nfe/Nfe';
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
  receivedDate?: Date | null;
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
    const paymentMethod =
      await this.paymentMethodRepository.findById(idPaymentMethod);
    if (!paymentMethod)
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
    let nf: Nfe | null = null;
    if (idNf) {
      nf = await this.nfeRepository.findNfeById(idNf);
      if (!nf)
        throw new HttpException(
          'Nota fiscal não encontrada',
          HttpStatus.BAD_REQUEST,
        );
    }

    const payment = new Payment({
      dueDate,
      emissionDate,
      paymentMethod: {
        idPaymentMethod: paymentMethod.id,
        namePaymentMethod: paymentMethod.name,
      },
      nf: {
        idNf: nf?.id ?? null,
        numberNf: nf?.numberNf ?? null,
      },
      value,
      receivedDate,
    });

    await this.paymentRepository.create(payment);

    return {
      status: HttpStatus.CREATED,
      message: 'Pagamento criado com sucesso',
    };
  }
}
