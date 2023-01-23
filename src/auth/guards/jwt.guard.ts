import {AuthGuard} from "@nestjs/passport";
import {ExecutionContext, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";

export class JwtGuard extends AuthGuard('jwt'){
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context);
    }


    handleRequest(err, user, info) {
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}