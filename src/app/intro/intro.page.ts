import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { DoorsService } from '../services/doors/doors.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  constructor(
    public doors: DoorsService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {

    // TODO: Remove!!
    this.doors.setupExperiment();

  }

  ngOnInit() {
  }

  async next() {

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
            this.navCtrl.navigateRoot('/doors');
          }
        }
      ]
    });

    await alert.present();
  }

}
