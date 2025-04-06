import { IPayload } from '@app/interfaces/IPayload';

export abstract class JWTService {
  public abstract generateToken(payload: IPayload): string;
  public abstract verifyToken(token: string): any;
}
