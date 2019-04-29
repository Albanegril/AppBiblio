import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ConnexionPourquoiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-connexion-pourquoi',
  templateUrl: 'connexion-pourquoi.html',
})
export class ConnexionPourquoiPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnexionPourquoiPage');
  }

  close(){
    console.log('fermer ConnexionPourquoiPage');
    this.viewCtrl.dismiss();
  }

}
