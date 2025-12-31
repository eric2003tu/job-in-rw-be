import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'supersecret',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    // Ensure the user object always has an 'id' property for req.user.id
    // Common JWT payloads use 'sub' for user id, so map it if needed
    return {
      id: payload.id || payload.sub,
      email: payload.email,
      ...payload
    };
  }
}
