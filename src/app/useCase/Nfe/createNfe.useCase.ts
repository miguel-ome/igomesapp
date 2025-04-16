import { Nfe } from '@app/entities/Nfe/Nfe';
import { NfeRepository } from '@app/repository/NfeRepository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

interface CreateNfeUseCaseRequest {
  numberNf: number;
  series: number;
  urlDanfe?: string;
  chaveNfe: string;
  emissionDate: Date;
  recipientCNPJ: string;
  recipientName: string;
  totValue: number;
  totICMS: number;
}

interface CreateNfeUseCaseResponse {
  status: number;
  message: string;
}

@Injectable()
export class CreateNfeUseCase {
  constructor(private nfeRepository: NfeRepository) {}

  async execute(
    request: CreateNfeUseCaseRequest,
  ): Promise<CreateNfeUseCaseResponse> {
    const {
      chaveNfe,
      emissionDate,
      numberNf,
      recipientCNPJ,
      recipientName,
      series,
      totICMS,
      totValue,
      urlDanfe,
    } = request;

    if (
      !chaveNfe ||
      !emissionDate ||
      !numberNf ||
      !recipientCNPJ ||
      !recipientName ||
      !series ||
      !totICMS ||
      !totValue
    )
      throw new HttpException(
        'Alguns dos campos vieram vazios',
        HttpStatus.BAD_REQUEST,
      );

    const nfe = new Nfe({
      chaveNfe,
      emissionDate,
      numberNf,
      recipientCNPJ,
      recipientName,
      series,
      totICMS,
      totValue,
      urlDanfe,
    });

    await this.nfeRepository.create(nfe);

    return {
      status: 201,
      message: 'Nfe criada com sucesso',
    };
  }
}
