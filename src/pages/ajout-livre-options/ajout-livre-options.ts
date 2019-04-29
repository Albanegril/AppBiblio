import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {ConnexionPourquoiPage} from "../connexion-pourquoi/connexion-pourquoi";
import {AjoutLivreIsbnScannerPage} from "../ajout-livre-isbn-scanner/ajout-livre-isbn-scanner";
import {AjoutLivreQrScannerPage} from "../ajout-livre-qr-scanner/ajout-livre-qr-scanner";

/**
 * Generated class for the AjoutLivreOptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajout-livre-options',
  templateUrl: 'ajout-livre-options.html',
})
export class AjoutLivreOptionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public modalCtrl: ModalController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjoutLivreOptionsPage');
  }

  onClickISBN() {
    console.log("go Scanner !");
    const modal = this.modalCtrl.create(AjoutLivreIsbnScannerPage);
    modal.present();
  }

  onClickForm() {
    console.log("go Form !");
    this.navCtrl.push('AjoutLivrePage');
  }

  onClickQR() {
    console.log("go Scanner !");
    const modal = this.modalCtrl.create(AjoutLivreQrScannerPage);
    modal.present();
  }
}
