import { Email } from '@app/entities/email/email';
import { User } from '@app/entities/user/user';
import { UserRepository } from '@app/repository/user/User.repository';

interface CreateUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateUserUseCaseResponse {
  user: User;
}

export class CreateUserUseCase {
  constructor(private createUserRepository: UserRepository) {}

  public async execute(
    request: CreateUserUseCaseRequest,
  ): Promise<CreateUserUseCaseResponse> {
    const { email, name, password } = request;

    const user = new User({ email: new Email(email), name, password });

    await this.createUserRepository.create(user);

    return {
      user,
    };
  }
}
