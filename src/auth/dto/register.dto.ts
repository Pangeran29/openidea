import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class RegisterDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  intoUser(): User {
    const user = new User();
    user.email = this.email;
    user.password = this.password;
    return user;
  }
  
  setPassword(password: string): string {
    this.password = password;
    return password;
  }
}
