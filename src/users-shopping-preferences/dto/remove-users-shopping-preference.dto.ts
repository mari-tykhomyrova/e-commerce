import { IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RemoveUsersShoppingPreferenceDto {
  @ApiProperty({
    required: true,
    type: [Number],
    description: 'Array of Users Shopping Preferences ids',
  })
  @IsArray()
  @IsNumber({}, { each: true })
  usersShoppingPreferenceIds: number[];
}
