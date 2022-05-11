import { ExtractJwt, Strategy } from "passport-jwt";
import { Request, Response } from "express";
import passport from "passport";
import { getRandomString } from "./string";
import jwt from "jsonwebtoken";
 
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

export const getSignedToken = () => {
    const userId = getRandomString();
    const userMail = `${userId}@example.com`;
    const token = jwt.sign(
        {
          payload: "custom payload",
          userEmail: userMail,
        },
        process.env.AUTH_HS256_KEY ?? "",
        {
          issuer: "http://pizza.ort/",
          subject: userId,
          audience: ["http://localhost/"],
          expiresIn: 60 * 24 * 24,
        }
    );
  
    return token;
};

export const Authenticate = (req: Request, res: Response, next: Function) => {
    passport.authenticate(jwtStrategy, (err, user) => {
        if(err) res.status(401).send({ messge: 'Unauthorized' });
        if(!user) res.status(401).send({ messge: 'Unauthorized' });
        else next();
    })(req, res, next);
};
