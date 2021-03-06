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
import {LienStorageProvider} from "../../providers/lien-storage/lien-storage";

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
              private lienStorageService: LienStorageProvider,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) {

      this.lienStorageService.getLivre(this.navParams.get('id')).then(data => {
      this.livre = data;
      if (typeof this.livre.proprio_L === "undefined" || this.livre.proprio_L === null )
      {
        this.livre.proprio_L = "Pas de Proprio";
      } else {
        this.lienStorageService.getLecteur(this.livre.proprio_L).then(data => {
          this.livre.proprio_L = data.pseudo;
          console.log('Proprio pseudo : ', this.livre.proprio_L);
        });
      }

      let listLecteurs: string[] = [];
      let lecteurs: Lecteur[];
      console.log("this.livre.id_L : ", this.livre.id_L);
      this.lienStorageService.getLecteursDeLivre(this.livre.id_L).then(dataBis => {
        lecteurs = dataBis;
        if (typeof lecteurs === "undefined" || lecteurs === null || lecteurs.length == 0 )
        {
          listLecteurs = ["Pas de Lecteur"];
        } else {
          for(let lecteur of lecteurs){
            listLecteurs.push(lecteur.pseudo);
          }
        }
        this.livre.lecteurs = listLecteurs;
      });

      // TODO prendre en compte que ssi sur mobile, image stockable sur firebase ?
      if (typeof this.livre.cover === "undefined" || this.livre.cover === null )
      {
        this.livre.cover = "assets/imgs/logobooks.png";
      }
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FicheLivrePage');
  }

  lire() {
    let lecteurs: Lecteur[] = [];
    this.lienStorageService.getLecteurs().then(data => {
      lecteurs = data;

      let alert = this.alertCtrl.create();
      alert.setTitle('Choisir un lecteur pour commencer la lecture de ce livre');
      for(let lecteur of lecteurs){
        alert.addInput({
          type: 'radio',
          label: lecteur.pseudo,
          value: lecteur.id,
          checked: false
        });
      }
      alert.addButton('Cancel');
      alert.addButton({
        text: 'Valider',
        handler: LecID => {
          if (LecID === "undefined" || LecID === null ) {
            console.log("Lecteur non séléctionné");
            let toast = this.toastCtrl.create({
              message: 'ERROR : champs vide',
              duration: 3000
            });
            toast.present();
            return false;
          } else {
            // TODO : /!\ Attention création d'abord dans Cloud
            this.lienFirebaseService.addLecture(this.navParams.get('id'), LecID, 0, "", new Date(), null).
            then(result => {
              let lecture:Lecture = new Lecture();
              // TODO : result --> remplacer par ID_Lecture
              lecture.setLecture(result.id, LecID, this.navParams.get('id'), 0, "", new Date(), null);
              this.navCtrl.push('FicheLecturePage', {'idLec': 'wh0dBMuYP8CoH0lqykJC', 'idLiv':this.livre.id_L, 'livre': this.livre});
            });
            let toast = this.toastCtrl.create({
              message: 'Success : Lecture créé',
              duration: 3000
            });
            toast.present();
          }
        }});
      alert.present();
    });
  }

  deplacer() {
    let biblios: Biblio[] = [];
    this.lienStorageService.getBiblios().then(data => {
      biblios = data;
      console.log('biblios : ', biblios);

      let alert = this.alertCtrl.create();
      for(let biblio of biblios){
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
          if (data === "undefined" || data === null ) {
            let toast = this.toastCtrl.create({
              message: 'ERROR : champs vide',
              duration: 3000
            });
            toast.present();
            return false;
          } else {
            // TODO : /!\ fct moveFormBiblio à refaire !!
            this.lienStorageService.moveFromBiblio(this.navParams.get('id'), data);
            let toast = this.toastCtrl.create({
               message: 'Success : Livre deplacé',
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
    this.navCtrl.push('EditLivrePage', {'data':this.livre, 'id':this.livre.id_L});
  }
}
