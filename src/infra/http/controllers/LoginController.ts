import { Controller, Get } from '@nestjs/common';

@Controller()
export class LoginController {
  @Get('signIn')
  public signIn() {
    return {
      message: 'Vamos fazer o login',
    };
  }
}
