import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    passwordToCheck: string,
  ): Promise<Partial<User>> {
    const user = await this.usersService.findOne({
      email: email,
    });
    if (!user) {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }
    if (!passwordToCheck || !user.password) {
      throw new HttpException('Please create a password', HttpStatus.FORBIDDEN);
    }
    // compare passwords
    const validate = await bcrypt.compare(passwordToCheck, user.password);
    if (!validate) {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }
    const { password, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
