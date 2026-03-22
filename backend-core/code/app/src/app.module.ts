import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule} from './db/prisma.module';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule,PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
