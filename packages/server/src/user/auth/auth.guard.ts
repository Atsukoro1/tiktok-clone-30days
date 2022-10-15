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

interface ValidationContent {
    _id: String;
    twoFactor: boolean;
};

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

function validate(context: ExecutionContext): ValidationContent | null {
    let req: Request = context.switchToHttp().getRequest();

    const token: String | null = getCookie('token', req);

    // Request header do not contain token cookie
    if(!token) {
        return null;
    };

    let decode = null;
    jwt.verify(token.toString(), process.env.JWT_SECRET, (err, decoded: any) => {
        if(err) {
            return null;
        }

        decode = {
            _id: decoded._id,
            twoFactor: decoded.twoFactor
        }
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
        const validation = validate(ctx);

        // TODO: Fix this spaghetti code later when I'll have time
        if(!validation) {
            throw new HttpException({
                statusCode: HttpStatus.UNAUTHORIZED,
                error: 'You are not authorized to access this resource'
            }, HttpStatus.UNAUTHORIZED);
        };

        const found: User = await this.userSchema.findOne({ _id: validation._id });

        if(!found) {
            throw new HttpException({
                statusCode: HttpStatus.UNAUTHORIZED,
                error: 'You are not authorized to access this resource'
            }, HttpStatus.UNAUTHORIZED);
        };

        if(found.twoFactorAuth && !validation.twoFactor) {
            throw new HttpException({
                statusCode: HttpStatus.UNAUTHORIZED,
                error: 'You are not authorized to access this resource'
            }, HttpStatus.UNAUTHORIZED);
        };

        ctx.switchToHttp().getRequest().user = found;

        return true;
    }
}