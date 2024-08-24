import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import {
  CurrentUser,
  GetCurrentUser,
  JwtAuthGuard,
} from '@app/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    {
      const user = await this.userService.findByEmail(registerDto.email);
      if (user) {
        throw new BadRequestException('User already registered');
      }
    }
    const hashedPassword = await this.authService.hash(registerDto.password);
    registerDto.setPassword(hashedPassword);
    const user = registerDto.intoUser();
    return await this.userService.create(user);
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) {
      throw new BadRequestException('User is not registered');
    }
    const validatePassword = await this.authService.compareHashed(
      loginDto.password,
      user.password,
    );
    if (!validatePassword) {
      throw new BadRequestException('User password is not valid');
    }
    const token = await this.authService.getAccessToken(user.id);
    return { user, token };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@GetCurrentUser() currentUser: CurrentUser) {
    return currentUser;
  }
}
