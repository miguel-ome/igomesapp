import { Email } from '@app/entities/email/email';
import { User } from '@app/entities/user/user';
import { UserRepository } from '@app/repository/user/User.repository';
import { NotFoundException } from '@nestjs/common';

interface UpdateUserUseCaseRequest {
  id: string;
  name: string;
  email: Email;
  password: string;
}

type UpdateUserUseCaseResponse = void;

export class UpdateUserUseCase {
  constructor(private updateUserRepository: UserRepository) {}

  public async execute(
    request: UpdateUserUseCaseRequest,
  ): Promise<UpdateUserUseCaseResponse> {
    const { id, name, email, password } = request;

    const user = await this.updateUserRepository.findUserById(id);

    if (!user) throw new NotFoundException('Not found user');

    const newUser = new User(
      { email, name, password, createdAt: user.createdAt },
      id,
    );
    newUser.update();
  }
}
