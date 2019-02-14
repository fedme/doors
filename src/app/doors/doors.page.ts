import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-doors',
  templateUrl: './doors.page.html',
  styleUrls: ['./doors.page.scss'],
})
export class DoorsPage implements OnInit {

  constructor(
    private alertCtrl: AlertController
  ) {

  }

  ngOnInit() {
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
