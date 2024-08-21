import { validate } from 'email-validator';

export class Email {
  private readonly email: string;

  private validateEmail(email: string): boolean {
    return validate(email);
  }

  constructor(email: string) {
    const emailIsValid = this.validateEmail(email);

    if (!emailIsValid) throw new Error('Invalid format E-mail');

    this.email = email;
  }

  public get value(): string {
    return this.value;
  }
}
