import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createHmac } from 'node:crypto';

@Injectable()
export class JwtService {
  private readonly accessSecret = 'access-secret-for-dev';
  private readonly refreshSecret = 'refresh-secret-for-dev';

  signAccessToken(sub: number, email: string) {
    return this.sign({ sub, email, type: 'access', exp: this.expireIn(15 * 60) }, this.accessSecret);
  }

  signRefreshToken(sub: number, email: string) {
    return this.sign({ sub, email, type: 'refresh', exp: this.expireIn(7 * 24 * 60 * 60) }, this.refreshSecret);
  }

  verifyRefreshToken(token: string) {
    return this.verify(token, this.refreshSecret, 'refresh');
  }

  private sign(payload: Record<string, unknown>, secret: string) {
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
    const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const signature = createHmac('sha256', secret).update(`${header}.${body}`).digest('base64url');

    return `${header}.${body}.${signature}`;
  }

  private verify(token: string, secret: string, type: string) {
    const [header, body, signature] = token.split('.');
    const expected = createHmac('sha256', secret).update(`${header}.${body}`).digest('base64url');

    if (!header || !body || !signature || expected !== signature) {
      throw new UnauthorizedException('Invalid token');
    }

    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as {
      sub: number;
      email: string;
      type: string;
      exp: number;
    };

    if (payload.type !== type || payload.exp < Math.floor(Date.now() / 1000)) {
      throw new UnauthorizedException('Token expired or invalid');
    }

    return payload;
  }

  private expireIn(seconds: number) {
    return Math.floor(Date.now() / 1000) + seconds;
  }
}
