import { UserEntity } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsPositive } from 'class-validator';
import { ShoppingPreferenceEntity } from './shopping-preference.entity';

export class UsersShoppingPreferenceEntity {
  @ApiProperty({ type: Number })
  @IsPositive()
  id: number;

  @ApiProperty({ type: Number })
  userId: number;

  @ApiProperty({ type: Number })
  shoppingPreferenceId: number;

  user: UserEntity;
  shoppingPreference: ShoppingPreferenceEntity;
}
