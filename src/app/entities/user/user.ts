import { Replace } from '@app/helpers/replace';
import { randomUUID } from 'crypto';
import { Email } from '../email/email';

export interface UserSchema {
  name: string;
  email: Email;
  password: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class User {
  private props: UserSchema;
  private _id: string;

  constructor(props: Replace<UserSchema, { createdAt?: Date }>, id?: string) {
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
    };
    this._id = id || randomUUID();
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this.props.name;
  }

  public get email(): string {
    return this.props.email.value;
  }

  public get password(): string {
    return this.props.password;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.createdAt;
  }

  public update(): void {
    this.props.updatedAt = new Date();
  }
}
