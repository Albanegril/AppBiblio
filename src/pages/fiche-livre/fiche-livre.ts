import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Livre} from "../../models/Livre";
import {LienFireBaseProvider} from "../../providers/lien-fire-base/lien-fire-base";
import {Maison} from "../../models/Maison";
import {Biblio} from "../../models/Biblio";

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
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) {

    console.log('fiche livre id : '+ this.navParams.get('id'));
    this.livre = lienFirebaseService.getLivre(this.navParams.get('id'));
    console.log('fiche livre data : '+ this.livre);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FicheLivrePage');
  }


  lire() {
    //TODO
    // créer ficher lecteur + add lecteur
  }

  deplacer() {
    //TODO
    // il faut créer des radioBtn dynamique des biblio dans l'alert !
    let biblios: Biblio[] = [];
    biblios = this.lienFirebaseService.retrieveBiblio();
    console.log('biblios : ', biblios);

      let alert = this.alertCtrl.create({
        title: 'Choisir une biblio',
        inputs: [
          {
            name: biblios[0].nom_B
          },
          {
            name: biblios[1].nom_B
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Valider',
            handler: data => {
              if (data.nom != null) {
                console.log("data ID : ",data.id);
                this.lienFirebaseService.changemenentBiblio(this.navParams.get('id'), data.id);
                let toast = this.toastCtrl.create({
                  message: 'Success : Maison ajouté',
                  duration: 3000
                });
                toast.present();
              } else {
                console.log("il faut au moins un nom pour créer une Maison");
                let toast = this.toastCtrl.create({
                  message: 'ERROR : il faut un nom pour créer une Maison',
                  duration: 3000
                });
                toast.present();
                return false;
              }
            }
          }
        ]
      });
      alert.present();
  }

  emprunter() {
    //TODO
    // lecteur exterieur
  }

  editer() {
    //TODO
    // vers page editLivre (modifier/supprimer/dédoubler/...)
  }
}
