import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { User } from '@prisma/client';
import {
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FindUsersDto } from './dto/find-users.dto';
import { UserEntity } from './entities/user.entity';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    description: 'Return requested user',
    type: UserEntity,
  })
  @ApiUnauthorizedResponse({ description: 'User is not authorised' })
  @ApiNotFoundResponse({ description: 'User was not found' })
  @ApiBody({ description: 'Return requested user' })
  @ApiQuery({ name: 'id', type: String, example: '1' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(
      { id: +id },
      { shoppingPreferences: { include: { shoppingPreference: true } } },
    );
  }

  @ApiOkResponse({
    description: 'Return all users according query',
    type: [UserEntity],
  })
  @ApiUnauthorizedResponse({ description: 'User is not authorised' })
  @ApiBody({ description: 'Return all users according query' })
  @Get()
  findAll(@Query() data: FindUsersDto): Promise<User[]> {
    return this.usersService.findAll(
      { shoppingPreferences: { include: { shoppingPreference: true } } },
      Number(data.take),
      Number(data.skip),
    );
  }
}
