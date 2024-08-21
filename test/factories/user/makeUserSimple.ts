import { Email } from '@app/entities/email/email';
import { User } from '@app/entities/user/user';

export function makeUserSimple() {
  return new User({
    name: 'Eliseu Miguel Marinho de Oliveira',
    email: new Email('libmigueldev@hotmail.com'),
    password: 'teste123',
  });
}
