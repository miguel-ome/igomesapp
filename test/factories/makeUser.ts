import { User } from '@app/entities/User/User';
import { faker } from '@faker-js/faker/.';

export function makeUsers(
  qtdUsers: number,
  userToTest?: { name: string; login: string; password: string },
): User[] | undefined {
  const users: User[] = [];
  // Quantity reported less than 0
  if (qtdUsers < 1) throw new Error('Quantidade de usuário menor que 1');

  // Quantity reported equal to 1
  if (qtdUsers === 1 && userToTest)
    return [
      new User({
        login: userToTest.login,
        name: userToTest.name,
        password: userToTest.password,
      }),
    ];

  // Quantity reported more than 1 with userToTest
  if (userToTest) {
    for (let i = 0; i < qtdUsers; i++) {
      users.push(
        new User({
          login: faker.person.firstName(),
          name: faker.person.fullName(),
          password: faker.internet.password(),
        }),
      );
    }
  }

  // Quantity reported more than 1 without userToTest
  for (let i = 0; i < qtdUsers; i++) {
    users.push(
      new User({
        login: faker.person.firstName(),
        name: faker.person.fullName(),
        password: faker.internet.password(),
      }),
    );
  }
}
