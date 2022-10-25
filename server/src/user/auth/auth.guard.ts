import * as jwt from 'jsonwebtoken';
import { Request } from "express";
import { 
    CanActivate, 
    ExecutionContext, 
    HttpException, 
    HttpStatus, 
    Injectable 
} from "@nestjs/common";
import { User } from '../user.interface';
import { driver } from 'src/main';
import { getUserByIdQuery } from 'src/queries/user.queries';
import { Session } from 'neo4j-driver';

interface ValidationContent {
    id: String;
    twoFactor: boolean;
};

function validate(context: ExecutionContext): ValidationContent | null {
    let req: Request = context.switchToHttp().getRequest();

    let token: String | null = req.headers['authorization'];

    // Request header do not contain token cookie
    if(!token) {
        return null;
    };

    token = token.replace('Bearer ', '');

    let decode = null;
    jwt.verify(token.toString(), process.env.JWT_SECRET, (err, decoded: any) => {
        if(err) {
            return null;
        }

        decode = {
            id: decoded.id,
            twoFactor: decoded.twoFactor
        }
    });

    return decode;
}

function returnNotAuthorized(session: Session) {
    session.close();
    throw new HttpException({
        statusCode: HttpStatus.UNAUTHORIZED,
        error: 'You are not authorized to access this resource'
    }, HttpStatus.UNAUTHORIZED);
}

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(
        ctx: ExecutionContext
    ): Promise<boolean> {
        const validation = validate(ctx);
        const session = driver.session();

        if(!validation) {
            session.close();
            returnNotAuthorized(session);
        };

        const found = await session.run(getUserByIdQuery, {
            id: validation.id
        });
        if(found.records.length == 0) returnNotAuthorized(session);

        let request = ctx.switchToHttp().getRequest();

        const foundUser: User = found.records[0].get(0).properties;

        if(
            (foundUser.twoFactorEnabled && !validation.twoFactor) 
            && !(/\/user\/auth\/2fa/gmi.test(request.url))
        ) returnNotAuthorized(session);

        request.user = foundUser;

        return true;
    }
}