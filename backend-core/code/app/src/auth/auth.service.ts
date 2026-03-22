import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private service: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(name: string, email: string, password: string) {
    const exists = await this.service.user.findUnique({
      where: { email },
    });

    if (exists) {
      throw new ConflictException('User already exists');
    }

    const salt = 10;
    const hash = await bcrypt.hash(password, salt);

    const user = await this.service.user.create({
      data: {
        name,
        email,
        password: hash,
      },
    });

    return this.createTokens(user.id, user.email, user.name);
  }

  async login(email: string, password: string) {
    const user = await this.service.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.createTokens(user.id, user.email, user.name);
  }

  async refresh(refreshToken: string) {
    const payload = this.jwtService.verifyRefreshToken(refreshToken);
    const user = await this.service.user.findUnique({
      where: { email: payload.email },
    });

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const validRefreshToken = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!validRefreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return this.createTokens(user.id, user.email, user.name);
  }

  private async createTokens(id: number, email: string, name: string | null) {
    const accessToken = this.jwtService.signAccessToken(id, email);
    const refreshToken = this.jwtService.signRefreshToken(id, email);
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    await this.service.user.update({
      where: { id },
      data: { refreshToken: refreshTokenHash },
    });

    return {
      user: {
        id,
        email,
        name,
      },
      accessToken,
      refreshToken,
    };
  }
}
