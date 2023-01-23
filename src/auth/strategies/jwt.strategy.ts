import {PassportStrategy} from "@nestjs/passport";
import {ConfigService} from "@nestjs/config";

import {ExtractJwt, Strategy} from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_ACCESS_SECRET')
        });
    }

    validate(payload: any){
        return { };
    }
}