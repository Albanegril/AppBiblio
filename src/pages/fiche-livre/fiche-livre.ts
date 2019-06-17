import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Livre} from "../../models/Livre";
import {LienFireBaseProvider} from "../../providers/lien-fire-base/lien-fire-base";
import {Maison} from "../../models/Maison";
import {Biblio} from "../../models/Biblio";
import {Lecteur} from "../../models/Lecteur";
import {Lecture} from "../../models/Lecture";
import {findLocaleData} from "@angular/common/src/i18n/locale_data_api";

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

    console.log('fiche livre id : ', this.navParams.get('id'));
    this.livre = lienFirebaseService.getLivre(this.navParams.get('id'));
    console.log('fiche livre data : ', this.livre);

    console.log('Id proprio : ', this.livre.proprio_L);

/*
    let proprio:string;
    proprio = this.livre.proprio_L;
    if (typeof this.livre.proprio_L === "undefined" || this.livre.proprio_L === null )
    {
      this.livre.proprio_L = "Pas de Proprio";
    } else {
      this.livre.proprio_L = this.lienFirebaseService.retrieveLecteurID(proprio).pseudo;
      console.log('proprio : ', proprio);
    }
    console.log('Proprio pseudo : ',this.livre.proprio_L);

    let listLecteurs: string[] = [];
    let lectures: Lecture[];
    let lecteurs: Lecteur[] = [];
    lecteurs = this.lienFirebaseService.retrieveLecteurDeLivre(this.livre.id_L);
    for(let lecture of lectures){
      if(lecture.idLec === this.livre.id_L){
        listLecteurs.push(this.lienFirebaseService.retrieveLecteurID(lecture.idLec).pseudo);
      }
    }
    console.log('Liste lecteur pseudo : ', listLecteurs);
*/

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FicheLivrePage');
  }


  lire() {
    //TODO
    // recupérer l'id lecteur grâce à un système de session
    // necessite stockage local !
    // créer la lecture !
    // alerte ?
    this.navCtrl.push('FicheLecturePage', {'idLec': 'wh0dBMuYP8CoH0lqykJC', 'idLiv':this.livre.id_L, 'livre': this.livre});
  }

  deplacer() {
    //TODO
    // il faut créer des radioBtn dynamique des biblio dans l'alert !
    // json schema ?
    let biblios: Biblio[] = [];
    //TODO pb car fct asynchron ?
    biblios = this.lienFirebaseService.retrieveBiblio();
    console.log('biblios : ', biblios);


      let alert = this.alertCtrl.create();
      alert.setTitle('Choisie une nouvelle biblio');

      for(let biblio of biblios){
        alert.addInput({
          type: 'radio',
          label: biblio.nom_B,
          value: biblio.id_B,
          checked: true
        });
      }

      alert.addButton('Cancel');
      alert.addButton({
        text: 'Valider',
        handler: data => {
          if (data.nom != null) {
            console.log("data ID : ", data.idLec);
            this.lienFirebaseService.changemenentBiblio(this.navParams.get('id'), data.id);
            let toast = this.toastCtrl.create({
              message: 'Success : Maison ajouté',
              duration: 3000
            });
            toast.present();
          } else {
            console.log("il faut un nom pour créer une Maison");
            let toast = this.toastCtrl.create({
              message: 'ERROR : champs NomMaison vide',
              duration: 3000
            });
            toast.present();
            return false;
          }
        }});
      alert.present();

  }

  emprunter() {
    //TODO
    // lecteur exterieur
    // lien annuaire telephone
  }

  editer() {
    this.navCtrl.push('EditLivrePage', {'data':this.livre, 'id':this.livre.id_L});
  }
}
