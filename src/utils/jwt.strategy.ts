import { ExtractJwt, Strategy } from "passport-jwt";
import { Request, Response } from "express";
import passport from "passport";
 
const opt = {
    secretOrKey: process.env.AUTH_HS256_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    issuer: `${process.env.AUTH_ISSUER_URL}`,
    algorithms: ["HS256"],
};
 
export const jwtStrategy = new Strategy(opt, (jwt_payload, done) => {
    if (!jwt_payload) done(true);
    else done(null, jwt_payload);
});

export const Authenticate = (req: Request, res: Response, next: Function) => {
    passport.authenticate(jwtStrategy, (err, user) => {
        if(err) res.status(401).send({ messge: 'Unauthorized' });
        if(!user) res.status(401).send({ messge: 'Unauthorized' });
        else next();
    })(req, res, next);
};
