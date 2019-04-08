import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Livre} from "../../models/Livre";

/**
 * Generated class for the FicheLivrePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fiche-livre',
  templateUrl: 'fiche-livre.html',
})
export class FicheLivrePage {
  public idL:String;
  public livre:Livre;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.idL = this.navParams.get('id');
    console.log(this.idL);
    this.getLivre(this.idL);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FicheLivrePage');
  }

  private getLivre(idL: String) {
        // init livre + attribut ?
        // TODO
  }
}
