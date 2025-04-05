import { Body, Controller, Post } from '@nestjs/common';
import { SignInDTO } from '../dto/Auth/signIn.DTO';
import { AuthUseCase } from '@app/useCase/Auth/auth.useCase';

@Controller('auth')
export class LoginController {
  constructor(private authUseCase: AuthUseCase) {}

  @Post('signIn')
  public async signIn(@Body() request: SignInDTO) {
    const { login, password } = request;

    const { user } = await this.authUseCase.validateUser({ login, password });

    const { access_token, message, status } = await this.authUseCase.login({
      user,
    });

    return {
      status,
      message,
      data: {
        access_token,
      },
    };
  }
}
