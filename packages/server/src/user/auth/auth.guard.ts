import * as jwt from 'jsonwebtoken';
import { Request } from "express";
import { 
    CanActivate, 
    ExecutionContext, 
    HttpException, 
    HttpStatus, 
    Injectable 
} from "@nestjs/common";

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

async function validate(context: ExecutionContext): Promise<boolean> {
    let req: Request = context.switchToHttp().getRequest();

    const token: String | null = getCookie('token', req);

    // Request header do not contain token cookie
    if(!token) {
        return false;
    };

    jwt.verify(token.toString(), process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            return false;
        }

        (<any>req).user = decoded; 
    });


    return true;
}

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        ctx: ExecutionContext
    ): boolean | Promise<boolean> {
        return validate(ctx).then((valid) => {
            if(!valid) {
                throw new HttpException({
                    statusCode: HttpStatus.UNAUTHORIZED,
                    error: 'You are not authorized to access this resource'
                }, HttpStatus.UNAUTHORIZED);
            };

            return true;
        });
    }
}