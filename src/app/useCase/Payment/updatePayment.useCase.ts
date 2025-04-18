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
  receivedDate?: Date;
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
    if (!idPaymentMethod || !dueDate || !emissionDate || !value) {
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
    if (!(await this.paymentMethodRepository.findById(idPaymentMethod)))
      throw new HttpException(
        'Forma de pagamento inválida',
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
    if (idNf && !(await this.nfeRepository.findNfeById(idNf)))
      throw new HttpException(
        'Nota fiscal não encontrada',
        HttpStatus.BAD_REQUEST,
      );

    // Atualizar o pagamento
    payment.update({
      dueDate,
      emissionDate,
      idNf,
      idPaymentMethod,
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
