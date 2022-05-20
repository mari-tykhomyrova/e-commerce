import { ApiProperty } from '@nestjs/swagger';
import { IsPositive } from 'class-validator';
import { TokenType } from '../../common/constants';
import { UserEntity } from './user.entity';

export class TokenEntity {
  @ApiProperty({ type: Number })
  @IsPositive()
  id: number;

  @ApiProperty({ type: Number })
  userId: number;

  @ApiProperty({ type: String })
  token: string;

  @ApiProperty({ type: TokenType })
  type: TokenType;

  @ApiProperty({ type: String })
  value: string | null;

  user?: UserEntity;
}
