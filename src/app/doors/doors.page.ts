import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
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
  step1Unlocked: boolean;
  finalDoorUnlocked: boolean;
  finalDoor: boolean;
  showEndButton: boolean;

  constructor(
    private doorsService: DoorsService,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private dataService: DataService,
    private toastCtrl: ToastController
  ) {
    this.reset();
  }

  ngOnInit() {
    this.reset();
    this.doorsService.doorsBattery.start();
  }

  reset() {
    this.doorState = DoorState.Closed;
    this.doorVisible = true;
    this.finalDoor = false;
    this.finalDoorUnlocked = false;
    this.step1Unlocked = false;
    this.showEndButton = false;
  }

  openDoor() {
    if (this.doorState !== DoorState.Closed) {
      return;
    }
    if (!this.finalDoor) {
      this.doorState = DoorState.Open;
      this.doorsService.doorsBattery.openDoor();
      setTimeout(_ => this.nextDoor(), 1700);
    } else {
      this.openFinalDoor();
    }
  }

  openFinalDoor() {
    this.doorState = AnimalDoorConverter.animalToDoor(this.doorsService.condition.animalShowed);
    this.showEndButton = true;
  }

  nextDoor() {
    if (this.doorState !== DoorState.Open) {
      return;
    }
    this.doorState = DoorState.Closed;
    this.doorVisible = false;
    setTimeout(() => this.doorVisible = true, 400);
    if (this.finalDoorUnlocked) {
      this.finalDoor = true;
    }
  }

  preunlockDoor() {
    this.step1Unlocked = true;
    setTimeout(_ => this.step1Unlocked = false, 1500);
  }

  async unlockDoor() {

    if (this.finalDoorUnlocked || !this.step1Unlocked) {
      return;
    }

    this.doorsService.doorsBattery.stop();
    this.finalDoorUnlocked = true;

    const toast = await this.toastCtrl.create({
      message: 'Door unlocked',
      duration: 500
    });
    toast.present();
    
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
