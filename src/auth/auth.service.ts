import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AccessToken } from './type/access-token.type';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async getAccessToken(userId: number): Promise<AccessToken> {
    const accessTokenPayload = { sub: userId };
    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      return { type: 'bearer', accessToken };
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Fail to create access token',
        jwtError: error,
      });
    }
  }

  async hash(data: any): Promise<string> {
    const saltOrRounds = 10;
    try {
      return await bcrypt.hash(data, saltOrRounds);
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Fail to hash password',
        bcryptError: error,
      });
    }
  }

  async compareHashed(data: any, hashedData: string): Promise<boolean> {
    try {
      return await bcrypt.compare(data, hashedData);
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Fail to compare password',
        bcryptError: error,
      });
    }
  }
}
