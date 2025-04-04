import { User } from '@app/entities/User/User';
import { UserRepository } from '@app/repository/user/User.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

interface FindUserByIdUseCaseRequest {
  id: string;
}

interface FindUserByIdUseCaseResponse {
  status: number;
  message: string;
  user: User;
}

@Injectable()
export class FindUserByIdUseCase {
  constructor(private findUserByIdRepository: UserRepository) {}

  public async execute(
    request: FindUserByIdUseCaseRequest,
  ): Promise<FindUserByIdUseCaseResponse> {
    const { id } = request;

    if (!id)
      throw new HttpException('Id não informado', HttpStatus.BAD_REQUEST);

    const user = await this.findUserByIdRepository.findById(id);

    if (!user)
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

    return {
      status: HttpStatus.OK,
      message: 'Usuário encontrado com sucesso',
      user,
    };
  }
}
