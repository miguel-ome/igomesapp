import { IPayload } from './IPayload';

export abstract class JWTService {
  public abstract genereteToken(payload: IPayload): string;
  public abstract verifyToken(token: string): any;
}
