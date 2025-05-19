import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MSA_SERVICE } from 'common/const/msa-service';
import { MESSAGE_CMD } from 'common/const/message-cmd';
import { sendMsaMessage } from 'common/util/send-msa-message';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(MSA_SERVICE.AUTH)
    private readonly authMsaService: ClientProxy,
  ) {
    super();
  }

  async validate(username: string, password: string) {
    const tokens = await sendMsaMessage(
      this.authMsaService,
      MESSAGE_CMD.LOGIN,
      { username, password },
    );

    if (!tokens) {
      throw new UnauthorizedException();
    }

    return tokens;
  }
}
