import { Module } from '@nestjs/common';
import { SignInController } from './SignIn.Controller';
import { ValidateUserAuthUseCase } from '@app/useCase/Auth/validateUserAuth.uesCase';
import { SignInUseCase } from '@app/useCase/Auth/signIn.useCase';
import { DatabaseModule } from '@infra/database/database.module';
import { JWT } from '@infra/auth/JWT';

@Module({
  imports: [DatabaseModule],
  controllers: [SignInController],
  providers: [
    ValidateUserAuthUseCase,
    SignInUseCase,
    {
      provide: 'TokenService',
      useClass: JWT,
    },
  ],
})
export class AuthModule {}
