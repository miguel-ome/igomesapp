import { User } from '@app/entities/user/user';
import { UserRepository } from '@app/repository/user/User.repository';
import { Injectable } from '@nestjs/common';

// interface ListAllUsersUseCaseRequest {}

interface ListAllUsersUseCaseResponse {
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
      users: listUsers,
    };
  }
}
