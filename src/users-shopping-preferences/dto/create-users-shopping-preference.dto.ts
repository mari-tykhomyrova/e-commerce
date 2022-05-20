import { IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsersShoppingPreferenceDto {
  @ApiProperty({
    required: true,
    type: [Number],
    description: 'Array of Shopping Preferences ids',
  })
  @IsArray()
  @IsNumber({}, { each: true })
  shoppingPreferenceIds: number[];
}
