import { Controller,Body,Post } from '@nestjs/common';
import {AuthService} from './auth.service';
import type{AuthBody} from './auth.types';


@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('register')
    register(@Body()body:AuthBody){
        return this.authService.register(body.username,body.password);
    }
    @Post('login')
    login(@Body()body:AuthBody){
        return this.authService.login(body.username,body.password);
    }

}
