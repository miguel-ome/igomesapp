import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { JwtStrategy } from '@infra/auth/jwtStrategy.useCase';
import { UserModule } from './controllers/User/user.module';
import { AuthModule } from './controllers/Auth/auth.module';
import { NfeModule } from './controllers/Nfe/Nfe.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, NfeModule],
  providers: [JwtStrategy],
})
export class HttpModule {}
