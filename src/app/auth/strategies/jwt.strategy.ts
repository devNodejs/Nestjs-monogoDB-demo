import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { UserService } from '../../user/user.service';
import * as passport from 'passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private userService: UserService) {

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'santosh'
        },
            async (req, payload, next) => await this.validate(req, payload, next)
        );
        passport.use(this);
    }

    // async validate(req, payload, done) {
    //     console.log("payload :-----------------------------------------",payload);
    //     const user = await this.userService.getUser(payload.id);
    //     if (!user) {
    //         // throw new UnauthorizedException();
    //         return done(new UnauthorizedException())
    //     }
    //     return done(null, payload)
    // }

}