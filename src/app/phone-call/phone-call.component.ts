import { Component, OnInit } from '@angular/core';
import { SipService } from '../call-service.service';

@Component({
  selector: 'app-phone-call',
  templateUrl: './phone-call.component.html',
  styleUrls: ['./phone-call.component.css']
})
export class PhoneCallComponent implements OnInit {
  constructor(private sipService: SipService) { }

  ngOnInit() {
    this.sipService.initializeSip();
  }

  async makeCall() {
    await this.sipService.makeCall();
  }

  async hangup() {
    await this.sipService.hangup();
  }

}
