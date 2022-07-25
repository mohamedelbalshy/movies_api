import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.userRepository.signUp(loginDto);

    const payload: JwtPayload = { username: user.username };

    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }

  async signIn(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.userRepository.signIn(loginDto);
    const payload: JwtPayload = { username: user.username };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
