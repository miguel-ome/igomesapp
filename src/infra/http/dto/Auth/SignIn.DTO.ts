import { IsNotEmpty } from 'class-validator';

export class SignInDTO {
  @IsNotEmpty({ message: 'Campo obrigatório' })
  login: string;

  @IsNotEmpty({ message: 'Campo obrigatório' })
  password: string;
}
