import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  private readonly logger = new Logger();
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    this.logger.log('inside logger');
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
