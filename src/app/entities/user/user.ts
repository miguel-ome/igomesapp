import { Replace } from '@app/helpers/replace';
import { randomUUID } from 'crypto';
import { Password } from '../Password/Password';

export interface UserSchema {
  name: string;
  login: string;
  password: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

interface UserUpdate {
  name: string;
  login: string;
}

export class User {
  private props: UserSchema;
  private _id: string;

  constructor(props: Replace<UserSchema, { createdAt?: Date }>, id?: string) {
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
      password: new Password(props.password).value,
    };
    this._id = id || randomUUID();
  }

  // Getters
  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this.props.name;
  }

  public get login(): string {
    return this.props.login;
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

  // Setters

  public set name(name: string) {
    this.props.name = name;
  }

  public set password(password: string) {
    this.props.password = new Password(password).value;
  }

  // Methods
  public update({ login, name }: UserUpdate): void {
    this.props.name = name;
    this.props.login = login;
    this.props.updatedAt = new Date();
  }
}
