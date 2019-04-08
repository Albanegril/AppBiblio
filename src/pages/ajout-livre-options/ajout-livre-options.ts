import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjoutLivreOptionsPage');
  }

  onClickISBN() {
    console.log("go Scanner !");
    //TODO
  }

  onClickForm() {
    console.log("go Form !");
    this.navCtrl.push('AjoutLivrePage');
  }

  onClickQR() {
    console.log("go Scanner !");
    //TODO
  }
}
