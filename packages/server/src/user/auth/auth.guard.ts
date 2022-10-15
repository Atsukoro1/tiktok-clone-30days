import * as jwt from 'jsonwebtoken';
import { Request } from "express";
import { 
    CanActivate, 
    ExecutionContext, 
    HttpException, 
    HttpStatus, 
    Inject, 
    Injectable 
} from "@nestjs/common";
import { Model } from 'mongoose';
import { User } from '../user.interface';

const getCookie = (name: string, req: Request): String | null => {
    const cookieHeader = req.headers.cookie;
    if(!cookieHeader) return null;

    const cookies = cookieHeader.split(';');
    for(let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split('=');
        if(cookie[0].trim() === name) return cookie[1];
    }

    return null;
}

function validate(context: ExecutionContext): String | null {
    let req: Request = context.switchToHttp().getRequest();

    const token: String | null = getCookie('token', req);

    // Request header do not contain token cookie
    if(!token) {
        return null;
    };

    let decode = null;
    jwt.verify(token.toString(), process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            return null;
        }

        decode = (<any>decoded)._id;
    });

    return decode;
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @Inject('USER_MODEL')
        private userSchema: Model<User>,
    ) {}
    
    async canActivate(
        ctx: ExecutionContext
    ): Promise<boolean> {
        const id_token = validate(ctx);

        if(!id_token) {
            throw new HttpException({
                statusCode: HttpStatus.UNAUTHORIZED,
                error: 'You are not authorized to access this resource'
            }, HttpStatus.UNAUTHORIZED);
        };

        const found = await this.userSchema.findOne({ _id: id_token });

        if(!found) {
            throw new HttpException({
                statusCode: HttpStatus.UNAUTHORIZED,
                error: 'You are not authorized to access this resource'
            }, HttpStatus.UNAUTHORIZED);
        };

        ctx.switchToHttp().getRequest().user = found;

        return true;
    }
}