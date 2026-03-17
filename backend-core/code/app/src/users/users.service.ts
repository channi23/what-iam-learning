import { Injectable,BadRequestException,UnauthorizedException } from '@nestjs/common';
import * as z from "zod";
import * as bcrypt from "bcrypt";

type User = {
    username:string;
    password:string;
};


const UserSchema = z.object({
     username:z.string(),
     password:z.string()
 });


@Injectable()
export class UsersService {
   private users:User[]=[];

    async register(data:unknown){
        const result= UserSchema.safeParse(data);
        if(!result.success){
            throw new BadRequestException(result.error.issues);
        }
        const parsed = result.data;

        const hash = await bcrypt.hash(parsed.password,10);
        this.users.push({
            username:parsed.username,
            password:hash,
        });
    }
    async login(data:unknown){
        const result = UserSchema.safeParse(data);
        if(!result.success){
            throw new BadRequestException(result.error.issues);
        }
        const parsed = result.data;
        const user = this.users.find((u)=>u.username===parsed.username);
        if(!user){
            throw new UnauthorizedException("Invalid Credentials");
        }
        const pass = await bcrypt.compare(parsed.password,user.password);
        if(!pass){
            throw new UnauthorizedException("InvalidCredentials");
        }
        //just login 
        return {message:"Login Successful"};
    }

}
