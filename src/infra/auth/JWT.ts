import { JWTService } from '@app/auth/JWTService';
import { IPayload } from '@app/interfaces/IPayload';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class JwtInfra implements JWTService {
  constructor(private jwtService: JwtService) {}

  public genereteToken(payload: IPayload): string {
    return this.jwtService.sign(payload);
  }

  public verifyToken(token: string): any {
    return this.jwtService.verify(token);
  }
}
