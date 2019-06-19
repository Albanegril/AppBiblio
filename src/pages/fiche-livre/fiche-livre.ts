import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Livre} from "../../models/Livre";
import {LienFireBaseProvider} from "../../providers/lien-fire-base/lien-fire-base";
import {Maison} from "../../models/Maison";
import {Biblio} from "../../models/Biblio";
import {Lecteur} from "../../models/Lecteur";
import {Lecture} from "../../models/Lecture";
import {findLocaleData} from "@angular/common/src/i18n/locale_data_api";
import {b} from "@angular/core/src/render3";
import {el} from "@angular/platform-browser/testing/src/browser_util";

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

    this.lienFirebaseService.getLivre(this.navParams.get('id')).then(data => {
      this.livre = data;
      console.log('fiche livre data : ', this.livre);
      console.log("Den " + JSON.stringify(this.livre));
      console.log('Id proprio : ', this.livre.proprio_L);


      if (typeof this.livre.proprio_L === "undefined" || this.livre.proprio_L === null )
      {
        this.livre.proprio_L = "Pas de Proprio";
      } else {
        this.lienFirebaseService.retrieveLecteurID(this.livre.proprio_L).then(data => {
          this.livre.proprio_L = data.pseudo;
          console.log('Proprio pseudo : ', this.livre.proprio_L);
        });
      }
      let listLecteurs: string[] = [];
      let lecteurs: Lecteur[];
      this.lienFirebaseService.retrieveLecteurDeLivre(this.livre.id_L).then(data => {
        lecteurs = data;
        if (typeof lecteurs === "undefined" || lecteurs === null || lecteurs.length == 0 )
        {
          listLecteurs = ["Pas de Lecteur"];
        } else {
          for(let lecteur of lecteurs){
            listLecteurs.push(lecteur.pseudo);
          }
        }
        console.log('Liste lecteur pseudo : ', listLecteurs);
        this.livre.lecteurs = listLecteurs;
        console.log('livre cover pres : ', this.livre.cover);
      });

      // TODO prendre en compte que ssi sur mobile, image stockable sur firebase ?
      if (typeof this.livre.cover === "undefined" || this.livre.cover === null )
      {
        this.livre.cover = "assets/imgs/logobooks.png";
      }
      console.log('livre cover : ', this.livre.cover);
    });
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
    // popup de creation lecture
    this.navCtrl.push('FicheLecturePage', {'idLec': 'wh0dBMuYP8CoH0lqykJC', 'idLiv':this.livre.id_L, 'livre': this.livre});
  }

  deplacer() {
    //TODO
    // il faut créer des radioBtn dynamique des biblio dans l'alert !
    // json schema ?
    let biblios: Biblio[] = [];
    //TODO pb car fct asynchron ?
    this.lienFirebaseService.retrieveBiblio().then(data => {
      biblios = data;
      console.log('biblios : ', biblios);

      let alert = this.alertCtrl.create();

      let biblio:Biblio = new Biblio();
      for(biblio of biblios){
        console.log('biblio id : ', biblio.id_B, 'biblio nom : ', biblio.nom_B);
        alert.addInput({
          type: 'radio',
          label: biblio.nom_B,
          value: biblio.id_B,
          checked: false
        });
      }

      alert.setTitle('Choisie une nouvelle biblio');

      alert.addButton('Cancel');
      alert.addButton({
        text: 'Valider',
        handler: data => {
          console.log('data alert : ', data);
          if (data === "undefined" || data === null ) {
            console.log("Biblio non séléctionné");
            let toast = this.toastCtrl.create({
              message: 'ERROR : champs vide',
              duration: 3000
            });
            toast.present();
            return false;
          } else {
            console.log("data value : ", data.value);
            //this.lienFirebaseService.changemenentBiblio(this.navParams.get('id'), data.id);
            let toast = this.toastCtrl.create({
              // message: 'Success : Livre deplacé',
              message: 'ERROR : Non fonctionnel',
              duration: 3000
            });
            toast.present();
          }
        }});
      alert.present();
    });
  }

  emprunter() {
    //TODO
    // lecteur exterieur
    // lien annuaire telephone
  }

  editer() {
    this.navCtrl.pop();
    this.navCtrl.push('EditLivrePage', {'data':this.livre, 'id':this.livre.id_L});
  }
}
