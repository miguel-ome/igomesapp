import { Nfe } from '@app/entities/Nfe/Nfe';
import { NfeRepository } from '@app/repository/NfeRepository';
import { PaymentMethodRepository } from '@app/repository/PaymentMethodRepository';
import { PaymentRepository } from '@app/repository/PaymentRepository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

interface UpdatePaymentUseCaseRequest {
  id: string;
  idPaymentMethod: string;
  idNf?: string;
  dueDate: Date;
  emissionDate: Date;
  receivedDate?: Date | null;
  value: number;
}

interface UpdatePaymentUseCaseResponse {
  status: number;
  message: string;
}

@Injectable()
export class UpdatePaymentUseCase {
  constructor(
    private paymentRepository: PaymentRepository,
    private paymentMethodRepository: PaymentMethodRepository,
    private nfeRepository: NfeRepository,
  ) {}

  async execute(
    request: UpdatePaymentUseCaseRequest,
  ): Promise<UpdatePaymentUseCaseResponse> {
    const {
      id,
      dueDate,
      emissionDate,
      idPaymentMethod,
      value,
      idNf,
      receivedDate,
    } = request;

    // Validar se os campos obrigatórios estão preenchidos
    if (!id || !idPaymentMethod || !dueDate || !emissionDate || !value) {
      throw new HttpException(
        'Preencha todos os campos obrigatórios',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Verificar se o método de pagamento existe
    // Essa variável payment será reutilizada na execução da alteração dos dados
    const payment = await this.paymentRepository.findById(id);
    if (!payment)
      throw new HttpException('Pagamento não encontrado', HttpStatus.NOT_FOUND);

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
        'Data de emissão não pode ser maior que a data de vencimento',
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

    // Atualizar o pagamento
    payment.update({
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
    await this.paymentRepository.save(payment);

    return {
      status: HttpStatus.OK,
      message: 'Pagamento atualizado com sucesso',
    };
  }
}
