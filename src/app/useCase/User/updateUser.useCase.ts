import { User } from '@app/entities/user/user';
import { UserRepository } from '@app/repository/user/User.repository';
import { Injectable } from '@nestjs/common';

interface CreateUserUseCaseRequest {
  name: string;
  login: string;
  password: string;
}

interface CreateUserUseCaseResponse {
  user: User;
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

    await this.createUserRepository.create(user);

    return {
      user,
    };
  }
}
