import { Injectable,UnauthorizedException } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import {JwtService} from "@nestjs/jwt";

type User={
    username:string;
    password:string;
};


@Injectable()
export class AuthService {
    private users:User[] = [];
    constructor(private jwtService:JwtService){}

    async register(username:string, password:string){
        const hash = await bcrypt.hash(password,10);
        this.users.push({
            username,
            password:hash
        });
        return {message:"User registered"};
    }
    async login(username:string,password:string){
        const user = this.users.find((u)=>u.username===username);
        if(!user){
            throw new UnauthorizedException("User not found");
        }
        const isValid = await bcrypt.compare(password,user.password);
        if(!isValid){
            throw new UnauthorizedException("Wrong password");
        }
        const token = this.jwtService.sign({username});
        return {access_token:token};
    }
}
