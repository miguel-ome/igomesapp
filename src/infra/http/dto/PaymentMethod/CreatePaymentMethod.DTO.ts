import { IsNotEmpty } from 'class-validator';

export class CreatePaymentMethodDTO {
  @IsNotEmpty({ message: 'Método de pagamento obrigatório' })
  name: string;
}
