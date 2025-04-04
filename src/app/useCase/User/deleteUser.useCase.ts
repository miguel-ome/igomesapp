import { UserRepository } from '@app/repository/user/User.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

interface DeleteUserUseCaseRequest {
  id: string;
}

interface DeleteUserUseCaseResponse {
  status: number;
  message: string;
}

@Injectable()
export class DeleteUserUseCase {
  constructor(private deleteUserRepository: UserRepository) {}

  public async execute(
    request: DeleteUserUseCaseRequest,
  ): Promise<DeleteUserUseCaseResponse> {
    const { id } = request;

    if (!id)
      throw new HttpException('ID não informado', HttpStatus.BAD_REQUEST);

    const user = await this.deleteUserRepository.findById(id);

    if (!user)
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

    await this.deleteUserRepository.delete(id);
    return {
      status: 200,
      message: 'Usuário excluido com sucesso',
    };
  }
}
