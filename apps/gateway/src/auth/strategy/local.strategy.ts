import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { MSA_SERVICE } from 'common/const/msa-service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(MSA_SERVICE.AUTH)
    private readonly authMsaService: ClientProxy,
  ) {
    super();
  }

  async validate(username: string, password: string) {
    const tokens = await lastValueFrom(
      this.authMsaService.send(
        {
          cmd: 'login',
        },
        { username, password },
      ),
    );

    if (!tokens) {
      throw new UnauthorizedException();
    }

    return tokens;
  }
}
