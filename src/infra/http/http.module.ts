import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@infra/auth/jwtStrategy.useCase';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './controllers/User/user.module';
import { AuthModule } from './controllers/Auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET as string,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    UserModule,
    AuthModule,
  ],
  providers: [JwtStrategy],
})
export class HttpModule {}
