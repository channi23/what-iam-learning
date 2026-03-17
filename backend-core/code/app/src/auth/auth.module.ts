import {MiddlwareConsumer,NestModule, Module } from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {AuthMiddleware} from './auth.middleware';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports:[
        JwtModule.register({
            secret:"SECRET_KEY",
            signOptions:{expiresIn:"1h"},
        }),
    ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule implements NestModule {
    configure(consumer:MiddlewareConsumer){
        consumer
            .apply(AuthMiddlware)
            .forRoutes('*');
    }
}
