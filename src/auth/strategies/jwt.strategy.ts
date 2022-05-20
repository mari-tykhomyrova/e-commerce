import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(validationPayload: {
    email: string;
    sub: string;
  }): Promise<Partial<User> | null> {
    const user = await this.usersService.findOne({
      email: validationPayload.email,
    });
    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      date_of_birth: user.date_of_birth,
      isActivated: user.isActivated,
    };
  }
}
