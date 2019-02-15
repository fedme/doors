import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DoorsService } from '../services/doors/doors.service';
import { DoorState } from '../services/doors/models';

@Component({
  selector: 'app-doors',
  templateUrl: './doors.page.html',
  styleUrls: ['./doors.page.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('200ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class DoorsPage implements OnInit {

  doorState: DoorState;
  doorVisible: boolean;

  constructor(
    private doorsService: DoorsService,
    private alertCtrl: AlertController
  ) {
    this.doorState = DoorState.Closed;
    this.doorVisible = true;
  }

  openDoor() {
    this.doorState = DoorState.Open;
    this.doorsService.doorsBattery.openDoor();
  }

  ngOnInit() {
  }

  nextDoor() {
    if (this.doorState !== DoorState.Open) {
      return;
    }
    this.doorState = DoorState.Closed;
    this.doorVisible = false;
    setTimeout(() => this.doorVisible = true, 500);
  }

  // async chooseInstructor(i: number) {

  //   const alert = await this.alertCtrl.create({
  //     header: 'Confirm?',
  //     message: '',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (blah) => {}
  //       }, {
  //         text: 'Okay',
  //         handler: () => {
  //           this.halo.testBattery.currentTest.chooseInstructor(i);
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

}
