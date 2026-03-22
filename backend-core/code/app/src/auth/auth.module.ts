import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/db/prisma.module';
import { JwtService } from './jwt.service';

@Module({
  imports: [PrismaModule],
  providers: [AuthService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
