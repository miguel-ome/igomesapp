import { Replace } from '@app/helpers/replace';
import { randomUUID } from 'crypto';

export interface PaymentSchema {
  paymentMethod: {
    idPaymentMethod: string;
    namePaymentMethod: string;
  };
  nf?: {
    idNf: string | null;
    numberNf: number | null;
  } | null;
  dueDate: Date;
  emissionDate: Date;
  receivedDate?: Date | null;
  value: number;
  createdAt: Date;
  updatedAt?: Date | null;
}

export interface UpdatePayment {
  paymentMethod: {
    idPaymentMethod: string;
    namePaymentMethod: string;
  };
  nf?: {
    idNf: string | null;
    numberNf: number | null;
  };
  dueDate: Date;
  emissionDate: Date;
  receivedDate?: Date | null;
  value: number;
}

export class Payment {
  private _id: string;
  private props: PaymentSchema;

  constructor(
    props: Replace<PaymentSchema, { createdAt?: Date }>,
    id?: string,
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
    };
    this._id = id || randomUUID();
  }

  /////////////
  // Getters
  /////////////
  public get id(): string {
    return this._id;
  }

  public get idPaymentMethod(): string {
    return this.props.paymentMethod.idPaymentMethod;
  }

  public get namePaymentMethod(): string {
    return this.props.paymentMethod.namePaymentMethod;
  }

  public get idNf(): string | null {
    return this.props.nf?.idNf ? this.props.nf.idNf : null;
  }

  public get numberNf(): number | null {
    return this.props.nf?.numberNf ? this.props.nf.numberNf : null;
  }

  public get dueDate(): Date {
    return this.props.dueDate;
  }

  public get emissionDate(): Date {
    return this.props.emissionDate;
  }

  public get receivedDate(): Date | null {
    return this.props.receivedDate ? this.props.receivedDate : null;
  }

  public get value(): number {
    return this.props.value;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | null {
    return this.props.updatedAt ? this.props.updatedAt : null;
  }

  /////////////
  // Methods
  /////////////
  public update({
    dueDate,
    emissionDate,
    nf,
    paymentMethod: { idPaymentMethod, namePaymentMethod },
    value,
    receivedDate,
  }: UpdatePayment): void {
    this.props.dueDate = dueDate;
    this.props.emissionDate = emissionDate;

    // Inicializa `nf` se ainda não existir
    if (!this.props.nf) {
      this.props.nf = { idNf: null, numberNf: null };
    }

    // Atualiza os valores de `nf` se fornecidos
    if (nf) {
      this.props.nf.idNf = nf.idNf ?? this.props.nf.idNf;
      this.props.nf.numberNf = nf.numberNf ?? this.props.nf.numberNf;
    }

    this.props.paymentMethod.idPaymentMethod = idPaymentMethod;
    this.props.paymentMethod.namePaymentMethod = namePaymentMethod;
    this.props.value = value;
    this.props.receivedDate = receivedDate;
    this.props.updatedAt = new Date();
  }
}
