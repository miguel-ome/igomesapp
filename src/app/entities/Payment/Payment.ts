import { Replace } from '@app/helpers/replace';
import { randomUUID } from 'crypto';

export interface PaymentMethodSchema {
  name: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export interface UpdatePaymentMethod {
  name: string;
}

export class PaymentMethod {
  private _id: string;
  private props: PaymentMethodSchema;

  constructor(
    props: Replace<PaymentMethodSchema, { createdAt?: Date }>,
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

  public get name(): string {
    return this.props.name;
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
  public update({ name }: UpdatePaymentMethod): void {
    this.props.name = name;
    this.props.updatedAt = new Date();
  }
}
