import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { User, Prisma, Token } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { MailService } from '../mail/mail.service';
import { CreateUserDto } from './dto/create-user.dto';
import { generate } from 'generate-password';
import { TokenType } from '../common/constants';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

  async findOne(
    where: Prisma.UserWhereInput,
    relations: Prisma.UserInclude | null = null,
  ): Promise<User & { tokens?: Token[] }> {
    let params = { where };
    if (relations) {
      params = Object.assign(params, { include: relations });
    }
    const user = await this.prisma.user.findFirst(params);
    if (!user) {
      throw new HttpException('User was not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  findAll(relations: Prisma.UserInclude = null, take = 25, skip = 0) {
    return this.prisma.user.findMany({
      include: relations,
      take,
      skip,
    });
  }

  async create(data: CreateUserDto): Promise<User> {
    const userExist = await this.findOne({ email: data.email }, null);
    if (userExist) {
      throw new HttpException(
        'User with such email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    // save user
    const password = generate({
      length: 10,
      numbers: true,
    });

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        full_name: data.full_name,
        date_of_birth: new Date(new Date(data.date_of_birth)),
      },
    });
    // save token
    const token = await bcrypt.hash(password, 10);
    await this.prisma.token.create({
      data: {
        userId: user.id,
        token,
        type: TokenType.activate,
      },
    });
    // send email
    this.mailService.sendUserActivation(user, token);

    return user;
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteToken(tokenId: number) {
    return this.prisma.token.delete({
      where: { id: tokenId },
    });
  }

  async createNewPassword(user: User): Promise<boolean> {
    // remove previous tokens
    await this.prisma.token.deleteMany({
      where: { userId: user.id, type: TokenType.reset },
    });
    // create token
    const password = generate({
      length: 10,
      numbers: true,
    });
    const token = await bcrypt.hash(password, 10);
    await this.prisma.token.create({
      data: {
        userId: user.id,
        token,
        value: await bcrypt.hash(password, 10),
        type: TokenType.reset,
      },
    });

    // send mail with link to update pass
    this.mailService.sendResetPassword(user, password, token);

    return !!token;
  }

  async activateUserOrResetPassword(
    id: string,
    token: string,
    tokenType: string,
  ): Promise<boolean> {
    // find token
    const user: User & { tokens?: Token[] } = await this.findOne(
      { id: Number(id) },
      { tokens: { where: { type: tokenType } } },
    );
    const tokenEntity = user.tokens.find(
      (t) => t.type === tokenType && t.token === token,
    );
    if (!user || !tokenEntity) {
      throw new HttpException("User doesn't exist", HttpStatus.BAD_REQUEST);
    }
    // update user
    let data = {};
    if (tokenType === TokenType.reset) {
      data = { password: tokenEntity.value };
    } else if (tokenType === TokenType.activate) {
      data = { isActivated: true };
    } else {
      throw new HttpException('Erroring token type', HttpStatus.BAD_REQUEST);
    }
    const result = !!(await this.update(user.id, data));
    // delete token
    await this.deleteToken(tokenEntity.id);

    return result;
  }
}
