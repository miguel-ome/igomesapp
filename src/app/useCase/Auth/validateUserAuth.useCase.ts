import { Password } from '@app/entities/Password/Password';
import { User } from '@app/entities/User/User';
import { UserRepository } from '@app/repository/user/User.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

interface ValidateUserAuthUseCaseRequest {
  login: string;
  password: string;
}

interface ValidateUserAuthUseCaseResponse {
  user: User;
}

@Injectable()
export class ValidateUserAuthUseCase {
  constructor(private validateUserAuthRepository: UserRepository) {}

  public async execute({
    login,
    password,
  }: ValidateUserAuthUseCaseRequest): Promise<ValidateUserAuthUseCaseResponse> {
    const user = await this.validateUserAuthRepository.findUserbyLogin(login);

    if (!user)
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

    const passwordIsCorrect = await Password.compare(password, user.password);

    if (!passwordIsCorrect)
      throw new HttpException('Senha incorreta', HttpStatus.UNAUTHORIZED);

    return {
      user,
    };
  }
}
