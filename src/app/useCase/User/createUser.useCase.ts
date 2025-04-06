import { User } from '@app/entities/User/User';
import { UserRepository } from '@app/repository/User.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

interface CreateUserUseCaseRequest {
  name: string;
  login: string;
  password: string;
}

interface CreateUserUseCaseResponse {
  status: number;
  message: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private createUserRepository: UserRepository) {}

  public async execute(
    request: CreateUserUseCaseRequest,
  ): Promise<CreateUserUseCaseResponse> {
    const { login, name, password } = request;

    if (!login || !name || !password)
      throw new Error('Email, password or name is empyty');

    const user = new User({ name, password, login });

    const userExists = await this.createUserRepository.findUserbyLogin(login);

    if (userExists)
      throw new HttpException('Usuário já existe', HttpStatus.CONFLICT);

    await this.createUserRepository.create(user);

    return {
      status: HttpStatus.CREATED,
      message: 'Usuário criado com sucesso',
    };
  }
}
