import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Livre} from "../../models/Livre";
import {LienFireBaseProvider} from "../../providers/lien-fire-base/lien-fire-base";

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private lienFirebaseService: LienFireBaseProvider,
              private toastCtrl: ToastController) {

    console.log(this.navParams.get('id'));
    //this.livre = this.getLivre(this.navParams.get('id'));
    console.log(this.livre);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FicheLivrePage');
  }

  private getLivre(idL: string) {
        // init livre + attribut ?
        // TODO
    this.lienFirebaseService.getLivre(idL)
      .then( res => {
        let toast = this.toastCtrl.create({
          message: 'Info Livre Trouvées',
          duration: 3000
        });
        toast.present();
        this.livre = res;
        console.log("affichage livre OK ...")
      }, err => {
        console.log(err);
      })
  }

  lire() {
    // créer ficher lecteur + add lecteur
  }

  deplacer() {
    // changement emplacement
    // modal ? ou popup ?
    // /!\ afficher emplacement !
  }

  emprunter() {
    // lecteur exterieur
  }

}
