import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { TokenType } from '../common/constants';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ActivateDto } from './dto/activate.dto';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './responses/login.response';
import { UserEntity } from '../users/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @ApiOkResponse({
    description: 'User was successfully created',
    type: Boolean,
  })
  @ApiBadRequestResponse({ description: 'User with such email already exists' })
  @Post('register')
  async register(@Body() data: CreateUserDto): Promise<boolean> {
    return !!(await this.usersService.create(data));
  }

  @ApiOkResponse({
    description: 'Return access token.',
    type: LoginResponse,
  })
  @ApiNotFoundResponse({
    description: "If email doesn't exist or password are not matched",
  })
  @ApiForbiddenResponse({ description: "If user doesn't have a password" })
  @ApiBody({ type: LoginDto })
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req): Promise<LoginResponse> {
    return this.authService.login(req.user);
  }

  @ApiOkResponse({
    description: 'User was successfully activated',
    type: Boolean,
  })
  @ApiNotFoundResponse({ description: 'User of token was not found' })
  @ApiBody({
    description:
      'After registration system sends email with activation link. Activating is required for account actions',
  })
  @Get('activate')
  async activate(@Query() data: ActivateDto): Promise<boolean> {
    // find token
    return this.usersService.activateUserOrResetPassword(
      data.id,
      data.token,
      TokenType.activate,
    );
  }

  @ApiOkResponse({
    description: 'Return user',
    type: UserEntity,
  })
  @ApiUnauthorizedResponse({ description: 'User is not authorised' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req): Promise<UserEntity> {
    return req.user;
  }

  @ApiOkResponse({
    description: 'Send email with mer password and activation link',
    type: Boolean,
  })
  @ApiUnauthorizedResponse({ description: 'User is not authorised' })
  @ApiBody({
    description: 'Send email with mer password and activation link',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('forget')
  async passwordForgot(@Request() req): Promise<boolean> {
    return this.usersService.createNewPassword(req.user);
  }

  @ApiOkResponse({
    description: "Users' password was successfully changed",
    type: Boolean,
  })
  @ApiNotFoundResponse({ description: 'User of token was not found' })
  @ApiBody({
    description: 'Updating password on visiting link activation',
  })
  @Get('reset')
  async passwordReset(@Query() data: ResetPasswordDto): Promise<boolean> {
    return this.usersService.activateUserOrResetPassword(
      data.id,
      data.token,
      TokenType.reset,
    );
  }
}
