import { ApiProperty } from '@nestjs/swagger';
import { IsPositive } from 'class-validator';
import { TokenEntity } from './token.entity';
import { UsersShoppingPreferenceEntity } from '../../users-shopping-preferences/entities/users-shopping-preference.entity';

export class UserEntity {
  @ApiProperty({ type: Number })
  @IsPositive()
  id: number;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  password: string | null;

  @ApiProperty({ type: String })
  full_name: string;

  @ApiProperty({ type: Date })
  date_of_birth: string;

  @ApiProperty({ type: Boolean })
  isActivated: boolean;

  shoppingPreferences?: UsersShoppingPreferenceEntity[];
  tokens?: TokenEntity[];
}
