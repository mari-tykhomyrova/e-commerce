import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    required: true,
    type: String,
    example: '1',
  })
  @IsString()
  id: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  token: string;
}
