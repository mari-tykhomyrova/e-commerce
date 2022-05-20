import { ApiProperty } from '@nestjs/swagger';
import { IsPositive } from 'class-validator';
import { UsersShoppingPreferenceEntity } from './users-shopping-preference.entity';

export class ShoppingPreferenceEntity {
  @ApiProperty({ type: Number })
  @IsPositive()
  id: number;

  @ApiProperty({ type: String })
  title: string;

  users: UsersShoppingPreferenceEntity[];
}
