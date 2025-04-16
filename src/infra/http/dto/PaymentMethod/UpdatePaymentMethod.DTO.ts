import { IsNotEmpty } from 'class-validator';

export class UpdatePaymentMethodDTO {
  @IsNotEmpty({ message: 'Método de pagamento obrigatório' })
  name: string;
}
