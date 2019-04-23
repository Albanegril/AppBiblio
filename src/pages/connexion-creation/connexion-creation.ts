import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {GestionCompteProvider} from "../../providers/gestion-compte/gestion-compte";
/**
 * Generated class for the ConnexionCreationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-connexion-creation',
  templateUrl: 'connexion-creation.html',
})
export class ConnexionCreationPage {
  private errorMessage: "Echec Inscription";

  constructor(private gestionnaireCompte: GestionCompteProvider,
              public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnexionCreationPage');
  }

  onSubmitForm(form: NgForm) {
    console.log(form.value);
    console.log("connexion compte");
    //TODO

    const email = form.value.email;
    const mdp = form.value.mdp;

    this.gestionnaireCompte.creationLecteur(email, mdp).then(
      () => {
        this.navCtrl.push('ConnexionPage').then(
          ()=>{
            this.navCtrl.setRoot('ConnexionPage');
          });
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
