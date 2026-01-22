import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log(`[AuthService] Validating user: ${email}`);
    const user = await this.usersService.findOne(email);
    if (!user) {
      console.log(`[AuthService] User not found: ${email}`);
      return null;
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (user && isPasswordValid) {
      console.log(`[AuthService] User validated successfully: ${email}`);
      const { password, ...result } = user;
      return result;
    }

    console.log(`[AuthService] Invalid password for user: ${email}`);
    return null;
  }

  async login(user: any) {
    console.log(`[AuthService] Login successful for user: ${user.email}`);
    const payload = { username: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
