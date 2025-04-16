import { NfeRepository } from '@app/repository/NfeRepository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

interface DeleteNfeUseCaseRequest {
  id: string;
}

interface DeleteNfeUseCaseResponse {
  status: number;
  message: string;
}

@Injectable()
export class DeleteNfeUseCase {
  constructor(private nfeRepository: NfeRepository) {}

  async execute(
    request: DeleteNfeUseCaseRequest,
  ): Promise<DeleteNfeUseCaseResponse> {
    const { id } = request;

    if (!id) throw new HttpException('ID não informado', HttpStatus.NO_CONTENT);

    await this.nfeRepository.delete(id);

    return {
      status: 204,
      message: 'Nfe deletada com sucesso',
    };
  }
}
