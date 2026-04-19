import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
    // TODO: Integrate with Supabase Auth for actual authentication
    // Currently returns a placeholder response
    const { email, password } = loginDto;

    // Placeholder: In production, validate credentials against Supabase Auth
    // const { data, error } = await this.supabase.auth.signInWithPassword({
    //   email,
    //   password,
    // });

    // For now, generate a JWT token for development
    const payload = { uid: 'dev-user', email };
    const token = await this.jwtService.sign(payload);

    return {
      success: true,
      uid: 'dev-user',
      token,
      expired: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
    };
  }

  async getProfile(user: { uid: string; email: string }) {
    return {
      success: true,
      uid: user.uid,
      email: user.email,
    };
  }
}