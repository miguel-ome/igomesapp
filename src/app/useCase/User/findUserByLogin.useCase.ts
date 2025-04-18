import { User } from '@app/entities/User/User';
import { UserRepository } from '@app/repository/User.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

interface FindUserByLoginUseCaseRequest {
  login: string;
}

interface FindUserByLoginUseCaseResponse {
  status: number;
  message: string;
  user: User;
}

@Injectable()
export class FindUserByLoginUseCase {
  constructor(private findUserByLoginRepository: UserRepository) {}

  public async execute(
    request: FindUserByLoginUseCaseRequest,
  ): Promise<FindUserByLoginUseCaseResponse> {
    const { login } = request;

    if (!login)
      throw new HttpException('Login não informado', HttpStatus.BAD_REQUEST);

    const user = await this.findUserByLoginRepository.findUserbyLogin(login);

    if (!user)
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

    return {
      status: HttpStatus.OK,
      message: 'Usuário encontrado com sucesso',
      user,
    };
  }
}
