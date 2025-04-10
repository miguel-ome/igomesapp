import { User } from '@app/entities/User/User';
import { SignInUseCase } from './signIn.useCase';
import { JWTService } from '@app/auth/JWTService';

describe('Sign in', () => {
  let signInUseCase: SignInUseCase;
  let jwtService: JWTService;

  beforeEach(() => {});

  it('Should be able sign and receive access token', () => {
    jwtService = {
      generateToken: jest.fn().mockReturnValue('mocked-token'),
      verifyToken: jest.fn(),
    };
    signInUseCase = new SignInUseCase(jwtService);

    const user = new User({
      login: 'eliseu',
      name: 'Eliseu Miguel',
      password: 'teste123',
    });

    expect(signInUseCase.execute({ user })).toEqual(
      expect.objectContaining({
        access_token: 'mocked-token',
      }),
    );
  });
});
