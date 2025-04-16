import { Nfe } from '@app/entities/Nfe/Nfe';
import { NfeRepository } from '@app/repository/NfeRepository';
import { HttpException, HttpStatus } from '@nestjs/common';

interface FindNfeByIdUseCaseRequest {
  id: string;
}

interface FindNfeByIdUseCaseResponse {
  status: number;
  message: string;
  nfe: Nfe;
}

export class FindNfeByIdUseCase {
  constructor(private nfeRepository: NfeRepository) {}

  async execute(
    request: FindNfeByIdUseCaseRequest,
  ): Promise<FindNfeByIdUseCaseResponse> {
    const { id } = request;
    if (!id)
      throw new HttpException('ID não informado', HttpStatus.BAD_REQUEST);

    const nfe = await this.nfeRepository.findNfeById(id);
    if (!nfe)
      throw new HttpException('NFe não encontrada', HttpStatus.NOT_FOUND);

    return {
      status: HttpStatus.OK,
      message: 'NFe encontrada com sucesso',
      nfe,
    };
  }
}
