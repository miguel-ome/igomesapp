import { UserRepository } from '@app/repository/user/User.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

interface UpdateUserUseCaseRequest {
  name: string;
  login: string;
  id: string;
}

interface UpdateUserUseCaseResponse {
  status: number;
  message: string;
}

@Injectable()
export class UpdateUserUseCase {
  constructor(private updateUserRepository: UserRepository) {}

  public async execute(
    request: UpdateUserUseCaseRequest,
  ): Promise<UpdateUserUseCaseResponse> {
    const { login, name, id } = request;

    // Exceptions
    if (!login || !name || !id)
      throw new HttpException('Login, nome e ID vazio', HttpStatus.BAD_REQUEST);

    const user = await this.updateUserRepository.findById(id);

    if (!user)
      throw new HttpException('Usuário inválido', HttpStatus.NOT_FOUND);

    user.update({ login, name });

    await this.updateUserRepository.save(user);

    return {
      status: HttpStatus.OK,
      message: 'Usuário atualizado com sucesso',
    };
  }
}
