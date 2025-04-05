import { Password } from '@app/entities/Password/Password';
import { User } from '@app/entities/User/User';
import { UserRepository } from '@app/repository/user/User.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IPayload } from './IPayload';

interface AuthValidateUseCaseRequest {
  login: string;
  password: string;
}

interface AuthValidateUseCaseResponse {
  user: User;
}

interface AuthLoginUseCaseRequest {
  user: User;
}

interface AuthLoginUseCaseResponse {
  status: number;
  message: string;
  access_token: string;
}

@Injectable()
export class AuthUseCase {
  constructor(
    private authRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  public async validateUser({
    login,
    password,
  }: AuthValidateUseCaseRequest): Promise<AuthValidateUseCaseResponse> {
    const user = await this.authRepository.findUserbyLogin(login);

    if (!user)
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

    const passwordIsCorrect = await Password.compare(password, user.password);

    if (!passwordIsCorrect)
      throw new HttpException('Senha incorreta', HttpStatus.UNAUTHORIZED);

    return {
      user,
    };
  }

  public async login({
    user,
  }: AuthLoginUseCaseRequest): Promise<AuthLoginUseCaseResponse> {
    const payload: IPayload = { login: user.login, sub: user.id };
    const access_token = await this.jwtService.sign(payload);
    return {
      status: HttpStatus.OK,
      message: 'Login efetuado com sucesso',
      access_token,
    };
  }
}
