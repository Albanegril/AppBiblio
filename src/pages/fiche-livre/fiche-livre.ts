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
  public livre:Livre = new Livre();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams.get('id'));
    this.getLivre(this.navParams.get('id'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FicheLivrePage');
  }

  private getLivre(idL: number) {
        // init livre + attribut ?
        // TODO
  }

  lire() {
    // créer ficher lecteur + add lecteur
  }

  deplacer() {
    // changement emplacement
    // modal ? ou popup ?
  }

  emprunter() {
    // lecteur exterieur
  }

}
