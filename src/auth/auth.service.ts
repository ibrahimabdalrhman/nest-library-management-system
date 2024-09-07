import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service'; // Adjust the path according to your project structure
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<any> {
    const user = await this.userService.findOne(loginDto.username);

    if (user && bcrypt.compareSync(loginDto.password, user.password)) {
      return user;
    }
    return null;
  }

  async login(user) {
    const payload = {
      username: user.username,
      sub: user._id.toString(),
      roles: user.roles,
    };
    console.log(payload);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
