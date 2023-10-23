// sip.service.ts
import { Injectable } from '@angular/core';
import { SimpleUser, SimpleUserOptions } from 'sip.js/lib/platform/web';

@Injectable({
  providedIn: 'root'
})
export class SipService {
  private simpleUser: SimpleUser | undefined;

  async initializeSip() {
    const server = 'wss://sip.linphone.org'; // SIP over WebSocket Server URL
    const destination = 'sip:recipient@sip.linphone.org'; // SIP Request URI of the recipient

    const aor = 'sip:aymenomri@sip.linphone.org'; // SIP Address of Record (AOR)
    const authorizationUsername = 'aymenomri'; // SIP Authorization Username
    const authorizationPassword = 'aymenomri'; // SIP Authorization Password

    const options: SimpleUserOptions = {
      aor,
      media: {
        remote: {
          audio: this.getAudioElement('remoteAudio')
        }
      },
      userAgentOptions: {
        authorizationPassword,
        authorizationUsername,
      }
    };

    this.simpleUser = new SimpleUser(server, options);

    this.simpleUser.delegate = {
      onCallReceived: async () => {
        await this.simpleUser!.answer();
      }
    };

    await this.simpleUser.connect();
    await this.simpleUser.register();
  }

  async makeCall() {
    const destination = 'sip:recipient@sip.linphone.org'; // Example destination
    await this.simpleUser!.call(destination);
  }

  async hangup() {
    await this.simpleUser!.hangup();
  }

  private getAudioElement(id: string): HTMLAudioElement {
    const el = document.getElementById(id);
    if (!(el instanceof HTMLAudioElement)) {
      throw new Error(`Element "${id}" not found or not an audio element.`);
    }
    return el;
  }
}
