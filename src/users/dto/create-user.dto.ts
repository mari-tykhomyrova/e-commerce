import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    example: '1981-11-12',
  })
  @IsDateString()
  date_of_birth: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  full_name: string;
}
