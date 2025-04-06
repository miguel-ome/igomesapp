import { Body, Controller, Post } from '@nestjs/common';
import { SignInDTO } from '@infra/http/dto/Auth/SignIn.DTO';
import { ValidateUserAuthUseCase } from '@app/useCase/Auth/validateUserAuth.useCase';
import { SignInUseCase } from '@app/useCase/Auth/signIn.useCase';

@Controller('auth')
export class SignInController {
  constructor(
    private validateUserAuthUseCase: ValidateUserAuthUseCase,
    private signInUseCase: SignInUseCase,
  ) {}

  @Post('signIn')
  public async signIn(@Body() request: SignInDTO) {
    const { login, password } = request;

    const { user } = await this.validateUserAuthUseCase.execute({
      login,
      password,
    });

    const { access_token, message, status } = this.signInUseCase.execute({
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
