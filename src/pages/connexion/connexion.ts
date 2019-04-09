import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NgForm} from "@angular/forms";
import { GestionCompteProvider } from '../../providers/gestion-compte/gestion-compte';

/**
 * Generated class for the ConnexionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-connexion',
  templateUrl: 'connexion.html',
})
export class ConnexionPage {
  private errorMessage: "Echec Connexion
  constructor(private gestionnaireCompte: GestionCompteProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnexionPage');
  }

/*
  goBack(){
    console.log(`goBack`);
    this.navCtrl.pop();
  }
*/

  onSubmitForm(form: NgForm) {
    console.log(form.value);
    console.log("connexion compte");
    //TODO

    const pseudo = form.value[0];
    const mdp = form.value[1];

    this.gestionnaireCompte.connexionLecteur(pseudo, mdp).then(
      () => {
        this.navCtrl.push('ListBiblioPage').then(
          ()=>{
          this.navCtrl.setRoot('ListBiblioPage');
        });
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }


  onClickCreationCompte() {
    // TODO
  }

  onClickPourquoiCompte() {
    // TODO
  }
}
