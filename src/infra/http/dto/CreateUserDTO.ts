import { IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'Campo obrigatório' })
  login: string;

  @IsNotEmpty({ message: 'Campo obrigatório' })
  name: string;

  @IsNotEmpty({ message: 'Campo obrigatório' })
  password: string;
}
