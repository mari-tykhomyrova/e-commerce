import {
  Controller,
  Post,
  Body,
  Delete,
  Request,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersShoppingPreferencesService } from './users-shopping-preferences.service';
import { CreateUsersShoppingPreferenceDto } from './dto/create-users-shopping-preference.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RemoveUsersShoppingPreferenceDto } from './dto/remove-users-shopping-preference.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('users-shopping-preferences')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users-shopping-preferences')
export class UsersShoppingPreferencesController {
  constructor(
    private readonly usersShoppingPreferencesService: UsersShoppingPreferencesService,
  ) {}

  @ApiOkResponse({
    description: "Users' shopping preferences was successfully created",
    type: Boolean,
  })
  @ApiForbiddenResponse({ description: 'Activate account firstly' })
  @ApiUnauthorizedResponse({ description: 'User is not authorised' })
  @ApiBody({ description: "Create users' shopping preferences" })
  @Post()
  create(
    @Body() data: CreateUsersShoppingPreferenceDto,
    @Request() req,
  ): Promise<boolean> {
    // check user activation
    if (!req.user.isActivated) {
      throw new HttpException('Activate account firstly', HttpStatus.FORBIDDEN);
    }
    // create preferences
    return this.usersShoppingPreferencesService.create(data, req.user.id);
  }

  @ApiOkResponse({
    description: "Users' shopping preferences was successfully removed",
    type: Boolean,
  })
  @ApiForbiddenResponse({ description: 'Activate account firstly' })
  @ApiUnauthorizedResponse({ description: 'User is not authorised' })
  @ApiBody({ description: "Remove users' shopping preferences" })
  @Delete()
  remove(
    @Body() data: RemoveUsersShoppingPreferenceDto,
    @Request() req,
  ): Promise<boolean> {
    // check user activation
    if (!req.user.isActivated) {
      throw new HttpException('Activate account firstly', HttpStatus.FORBIDDEN);
    }
    // create, update, delete preferences
    return this.usersShoppingPreferencesService.remove(data);
  }
}
