import{NestMiddleware,Injectable} from "@nestjs/common";
import {Request,Response,NextFunction} from "express";
import *as jwt from "jsonwebtoken";

@Injectable()
export class AuthMiddleware implements NestMiddleware{
    use(req:Request,res:Response,next:NextFunction){
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({message:"Unauthorized"});
        }
        const token = authHeader.split(" ")[1];

        try{
            const decode = jwt.verify(token,"SECRET_KEY");
            (req as any).user = decoded;
            next();
        }catch(err){
            return res.err(401).json({message:"Invalid token"});
        }
    }
}
