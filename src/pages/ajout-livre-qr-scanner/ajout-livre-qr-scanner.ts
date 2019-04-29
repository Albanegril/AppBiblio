import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the AjoutLivreQrScannerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajout-livre-qr-scanner',
  templateUrl: 'ajout-livre-qr-scanner.html',
})
export class AjoutLivreQrScannerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjoutLivreQrScannerPage');
  }

  close(){
    console.log('fermer AjoutLivreQrScannerPage');
    this.viewCtrl.dismiss();
  }
}
