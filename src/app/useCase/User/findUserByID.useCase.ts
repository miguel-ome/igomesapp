import { User } from '@app/entities/user/user';
import { UserRepository } from '@app/repository/user/User.repository';
import { NotFoundException } from '@nestjs/common';

interface FindUserByIDUseCaseRequest {
  idUser: string;
}

interface FindUserByIDUseCaseResponse {
  user: User;
}

export class FindUserByIDUseCase {
  constructor(private findUserByIDRepository: UserRepository) {}

  public async execute(
    request: FindUserByIDUseCaseRequest,
  ): Promise<FindUserByIDUseCaseResponse> {
    const { idUser } = request;

    const user = await this.findUserByIDRepository.findUserById(idUser);

    if (!user) throw new NotFoundException('Not found user');

    return {
      user,
    };
  }
}
