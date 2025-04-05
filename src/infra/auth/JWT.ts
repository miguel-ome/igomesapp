import { IPayload } from '@app/interfaces/IPayload';
import { JWTService } from '@app/interfaces/JWTService';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class JWT implements JWTService {
  constructor(private jwtService: JwtService) {}

  public genereteToken(payload: IPayload): string {
    return this.jwtService.sign(payload);
  }

  public verifyToken(token: string): any {
    return this.jwtService.verify(token);
  }
}
