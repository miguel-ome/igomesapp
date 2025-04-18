import { NfeRepository } from '@app/repository/NfeRepository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

interface UpdateNfeUseCaseRequest {
  id: string;
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

interface UpdateNfeUseCaseResponse {
  status: number;
  message: string;
}

@Injectable()
export class UpdateNfeUseCase {
  constructor(private nfeRepository: NfeRepository) {}

  async execute(
    request: UpdateNfeUseCaseRequest,
  ): Promise<UpdateNfeUseCaseResponse> {
    const {
      id,
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

    if (!id)
      throw new HttpException('ID não informado', HttpStatus.BAD_REQUEST);

    const nfe = await this.nfeRepository.findNfeById(id);

    if (!nfe)
      throw new HttpException('Nfe não encontrada', HttpStatus.BAD_REQUEST);

    nfe.update({
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
    await this.nfeRepository.save(nfe);

    return {
      status: 201,
      message: 'Nfe atualizada com sucesso',
    };
  }
}
