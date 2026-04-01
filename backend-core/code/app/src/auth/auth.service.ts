import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private service: PrismaService, private jwtService:JwtService) {}

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

    return this.toUserResponse(user);
  }

  async login(email: string, password: string):Promise<{access_token:String}> {
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

    const payload = {sub:user.id, email:user.email};

    return {
      access_token: await this.jwtService.signAsync(payload,{expiresIn:'15m'})
    };
    
  }

  private toUserResponse(user: { id: number; email: string; name: string | null }) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
