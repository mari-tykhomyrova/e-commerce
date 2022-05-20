import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserActivation(user: User, token: string) {
    const url = `${process.env.HOST}:${process.env.PORT}/auth/activate?id=${user.id}token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      from: '"Support Team" <support@example.com>',
      subject: 'Welcome to E-Commerce! Confirm your Email',
      template: 'confirmation',
      context: {
        name: user.full_name,
        url,
      },
    });
  }

  async sendResetPassword(user: User, password: string, token: string) {
    const url = `${process.env.HOST}:${process.env.PORT}/auth/reset?id=${user.id}&token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      from: '"Support Team" <support@example.com>',
      subject: 'E-Commerce Reset password',
      template: 'reset-password',
      context: {
        name: user.full_name,
        password,
        url,
      },
    });
  }
}
