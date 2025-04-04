import { IsNotEmpty } from 'class-validator';

export class UpdateUserDTO {
  @IsNotEmpty({ message: 'Campo obrigatório' })
  login: string;

  @IsNotEmpty({ message: 'Campo obrigatório' })
  name: string;
}
