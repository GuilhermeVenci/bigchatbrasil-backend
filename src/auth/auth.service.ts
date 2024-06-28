import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    email: string,
    pass: string
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (!isPasswordValid) {
      return null;
    }

    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;

    return userWithoutPassword;
  }

  async login(
    user: Omit<User, 'password'>
  ): Promise<{ access_token: string; role: string }> {
    try {
      const payload = { email: user.email, sub: user.id };

      return {
        access_token: this.jwtService.sign(payload, { expiresIn: '30d' }),
        role: user.role,
      };
    } catch (error) {
      throw new Error('Error generating token');
    }
  }

  async register(
    data: Prisma.UserCreateInput
  ): Promise<{ access_token: string }> {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const userData: Prisma.UserCreateInput = {
        ...data,
        password: hashedPassword,
      };
      const user = await this.userService.createUser(userData);
      return this.login(user);
    } catch (error) {
      throw new Error('Error during registration');
    }
  }

  async getMe(user: User): Promise<Omit<User, 'password'> | null> {
    if (user) {
      const userWithoutPassword = { ...user };
      delete userWithoutPassword.password;
      return userWithoutPassword;
    }
    return null;
  }
}
