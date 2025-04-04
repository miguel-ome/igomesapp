import * as bycript from 'bcrypt';

export class Password {
  private _password: string;
  protected readonly saltRounds = 10;

  constructor(private password: string) {
    if (!this.password) throw new Error('Password is required');

    if (Password.isHashed(this.password)) {
      this._password = password;
    } else {
      this._password = bycript.hashSync(this.password, this.saltRounds);
    }
  }

  get value(): string {
    return this._password;
  }

  static isHashed(password: string): boolean {
    return (
      password.startsWith('$2b$') ||
      password.startsWith('$2a$') ||
      password.startsWith('$2y$')
    );
  }

  static hash(password: string): string {
    return bycript.hashSync(password, 10);
  }

  static compare(password: string, hashedPassword: string): boolean {
    return bycript.compareSync(password, hashedPassword);
  }
}
