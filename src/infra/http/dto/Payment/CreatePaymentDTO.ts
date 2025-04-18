import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreatePaymentDTO {
  @IsString({ message: 'idPaymentMethod deve ser uma string.' })
  @IsNotEmpty({ message: 'idPaymentMethod é obrigatório.' })
  idPaymentMethod: string;

  @IsOptional()
  @IsString({ message: 'idNf deve ser uma string.' })
  idNf?: string;

  @IsDate({ message: 'dueDate deve ser uma data.' })
  @IsNotEmpty({ message: 'dueDate é obrigatório.' })
  dueDate: Date;

  @IsDate({ message: 'emissionDate deve ser uma data.' })
  @IsNotEmpty({ message: 'emissionDate é obrigatório.' })
  emissionDate: Date;

  @IsDate({ message: 'receivedDate deve ser uma data.' })
  @IsOptional()
  receivedDate?: Date;

  @IsNumber({ allowNaN: false }, { message: 'value deve ser um número.' })
  @Min(0.01, { message: 'value deve ser maior que 0' })
  @IsNotEmpty({ message: 'value é obrigatório.' })
  value: number;
}
