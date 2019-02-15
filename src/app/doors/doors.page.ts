import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DoorsService } from '../services/doors/doors.service';
import { DoorState, Animal, AnimalDoorConverter } from '../services/doors/models';
import { DataService } from '../services/common/data.service';

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
  unlockFinalDoor: boolean;
  finalDoor: boolean;

  constructor(
    private doorsService: DoorsService,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private dataService: DataService
  ) {
    this.doorState = DoorState.Closed;
    this.doorVisible = true;
    this.finalDoor = false;
    this.unlockFinalDoor = false;
  }

  ngOnInit() {
    this.doorState = DoorState.Closed;
    this.doorVisible = true;
    this.finalDoor = false;
    this.unlockFinalDoor = false;
    this.doorsService.doorsBattery.start();
  }

  openDoor() {
    if (this.doorState !== DoorState.Closed) {
      return;
    }
    if (!this.finalDoor) {
      this.doorState = DoorState.Open;
      this.doorsService.doorsBattery.openDoor();
    } else {
      this.openFinalDoor();
    }
  }

  openFinalDoor() {
    this.doorState = AnimalDoorConverter.animalToDoor(this.doorsService.condition.animalShowed);
  }

  nextDoor() {
    if (this.doorState !== DoorState.Open) {
      return;
    }
    this.doorState = DoorState.Closed;
    this.doorVisible = false;
    setTimeout(() => this.doorVisible = true, 500);
    if (this.unlockFinalDoor) {
      this.finalDoor = true;
    }
  }

  async unlockMonster() {

    const alert = await this.alertCtrl.create({
      header: 'Confirm?',
      message: '',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {}
        }, {
          text: 'Okay',
          handler: () => {
            this.doorsService.doorsBattery.stop();
            this.unlockFinalDoor = true;
          }
        }
      ]
    });

    await alert.present();
  }

  async end() {

    if (this.doorState === DoorState.Closed) {
      return;
    }

    const alert = await this.alertCtrl.create({
      header: 'Confirm?',
      message: '',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {}
        }, {
          text: 'Okay',
          handler: () => {
            this.dataService.save();
            this.navCtrl.navigateRoot('/end');
          }
        }
      ]
    });

    await alert.present();
  }

}
