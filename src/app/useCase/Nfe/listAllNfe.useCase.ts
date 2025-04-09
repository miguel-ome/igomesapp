import { Nfe } from '@app/entities/Nfe/Nfe';
import { NfeRepository } from '@app/repository/NfeRepository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

// interface ListAllNfeUseCaseRequest {}

interface ListAllNfeUseCaseResponse {
  status: number;
  message: string;
  listNfe: Nfe[];
}

@Injectable()
export class ListAllNfeUseCase {
  constructor(private nfeRepository: NfeRepository) {}

  async execute(): Promise<ListAllNfeUseCaseResponse> {
    const listNfe = await this.nfeRepository.listAllNfe();

    if (!listNfe)
      throw new HttpException(
        'Erro no processamento dos dados',
        HttpStatus.BAD_REQUEST,
      );

    return {
      status: 201,
      message: 'Lista de Nfe enviada com sucesso',
      listNfe,
    };
  }
}
