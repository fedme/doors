import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-outro',
  templateUrl: './outro.page.html',
  styleUrls: ['./outro.page.scss'],
})
export class OutroPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {

  }

  ngOnInit() {
  }

  // async next() {

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
  //           this.navCtrl.navigateRoot('/videos');
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

}
