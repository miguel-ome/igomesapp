import { Module } from '@nestjs/common';
import { SignInController } from './SignIn.Controller';
import { ValidateUserAuthUseCase } from '@app/useCase/Auth/validateUserAuth.uesCase';
import { SignInUseCase } from '@app/useCase/Auth/signIn.useCase';
import { DatabaseModule } from '@infra/database/database.module';
import { JwtInfra } from '@infra/auth/JWT';
import { JwtModule } from '@nestjs/jwt';
import { JWTService } from '@app/auth/JWTService';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET as string,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [SignInController],
  providers: [
    ValidateUserAuthUseCase,
    SignInUseCase,
    {
      provide: JWTService,
      useClass: JwtInfra,
    },
  ],
})
export class AuthModule {}
