import { Provider, Role } from '@prisma/client';

export class UserDto {
  id: string;
  email: string;
  phone: string;
  provider: Provider;
  name: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
