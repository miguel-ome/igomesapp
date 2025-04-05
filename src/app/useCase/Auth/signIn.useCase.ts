import { User } from '@app/entities/User/User';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IPayload } from '../../interfaces/IPayload';
import { JWTService } from '@app/auth/JWTService';

interface SignInUseCaseRequest {
  user: User;
}

interface SignInUseCaseResponse {
  status: number;
  message: string;
  access_token: string;
}

@Injectable()
export class SignInUseCase {
  constructor(private readonly jwtService: JWTService) {}

  public execute({ user }: SignInUseCaseRequest): SignInUseCaseResponse {
    const payload: IPayload = { login: user.login, sub: user.id };
    const access_token = this.jwtService.genereteToken(payload);

    if (!access_token)
      throw new HttpException(
        'Erro do sistema na execução do login',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return {
      status: HttpStatus.OK,
      message: 'Login efetuado com sucesso',
      access_token,
    };
  }
}
