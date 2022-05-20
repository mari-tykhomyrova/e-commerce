import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindUsersDto {
  @ApiProperty({
    required: true,
    type: String,
    example: '25',
  })
  @IsString()
  take = '25';

  @ApiProperty({
    required: true,
    type: String,
    example: '0',
  })
  @IsString()
  skip = '0';
}
