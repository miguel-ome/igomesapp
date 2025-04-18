import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentMethodDTO {
  @IsString()
  @IsNotEmpty({ message: 'Método de pagamento obrigatório' })
  name: string;
}
