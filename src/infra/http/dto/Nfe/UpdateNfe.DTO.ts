import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { cnpj } from 'cpf-cnpj-validator';

@ValidatorConstraint({ name: 'isCnpj', async: false })
class IsCnpjConstraint implements ValidatorConstraintInterface {
  validate(value: string) {
    return cnpj.isValid(value); // true ou false
  }

  defaultMessage() {
    return 'CNPJ inválido';
  }
}

export class UpdateNfeDTO {
  @IsNotEmpty({ message: 'Campo [id] é obrigatório' })
  @IsString()
  id: string;

  @IsNotEmpty({ message: 'Campo [numberNf] é obrigatório' })
  @IsNumber()
  numberNf: number;

  @IsNotEmpty({ message: 'Campo [series] é obrigatório' })
  @IsNumber()
  series: number;

  @IsOptional()
  @IsUrl()
  urlDanfe?: string;

  @IsNotEmpty({ message: 'Campo [chaveNfe] é obrigatório' })
  @IsString()
  chaveNfe: string;

  @IsNotEmpty({ message: 'Campo [emissionDate] é obrigatório' })
  @IsDate()
  emissionDate: Date;

  @IsNotEmpty({ message: 'Campo [recipientCNPJ] é obrigatório' })
  @Validate(IsCnpjConstraint)
  recipientCNPJ: string;

  @IsNotEmpty({ message: 'Campo [recipientName] é obrigatório' })
  @IsString()
  recipientName: string;

  @IsNotEmpty({ message: 'Campo [totValue] é obrigatório' })
  @IsNumber()
  totValue: number;

  @IsNotEmpty({ message: 'Campo [totICMS] é obrigatório' })
  @IsNumber()
  totICMS: number;
}
