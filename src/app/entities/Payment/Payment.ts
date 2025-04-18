import { Replace } from '@app/helpers/replace';
import { randomUUID } from 'crypto';

export interface PaymentSchema {
  idPaymentMethod: string;
  idNf?: string | null;
  dueDate: Date;
  emissionDate: Date;
  receivedDate?: Date | null;
  value: number;
  createdAt: Date;
  updatedAt?: Date | null;
}

export interface UpdatePayment {
  idPaymentMethod: string;
  idNf?: string;
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
    return this.props.idPaymentMethod;
  }

  public get idNf(): string | null {
    return this.props.idNf ? this.props.idNf : null;
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

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | null {
    return this.props.updatedAt ? this.props.updatedAt : null;
  }

  public get value(): number {
    return this.props.value;
  }

  /////////////
  // Methods
  /////////////
  public update({
    dueDate,
    emissionDate,
    idNf = '',
    idPaymentMethod,
    value,
    receivedDate,
  }: UpdatePayment): void {
    this.props.dueDate = dueDate;
    this.props.emissionDate = emissionDate;
    this.props.idNf = idNf;
    this.props.idPaymentMethod = idPaymentMethod;
    this.props.value = value;
    this.props.receivedDate = receivedDate;
    this.props.updatedAt = new Date();
  }
}
