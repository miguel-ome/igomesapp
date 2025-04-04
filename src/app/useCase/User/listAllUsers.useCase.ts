import { User } from '@app/entities/user/user';
import { UserRepository } from '@app/repository/user/User.repository';
import { HttpStatus, Injectable } from '@nestjs/common';

// interface ListAllUsersUseCaseRequest {}

interface ListAllUsersUseCaseResponse {
  status: number;
  message: string;
  users: User[];
}

@Injectable()
export class ListAllUsersUseCase {
  constructor(private listAllUsers: UserRepository) {}

  public async execute(): Promise<ListAllUsersUseCaseResponse> {
    const listUsers = await this.listAllUsers.listAllUsers();

    if (!listUsers) {
      throw new Error('No users found');
    }

    return {
      status: HttpStatus.OK,
      message: 'Usuários listados com sucesso',
      users: listUsers,
    };
  }
}
