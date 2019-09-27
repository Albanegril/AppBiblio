import { Component } from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {LienFireBaseProvider} from "../../providers/lien-fire-base/lien-fire-base";
import {Maison} from "../../models/Maison";
import {Lecteur} from "../../models/Lecteur";
import {ConnexionCreationPage} from "../connexion-creation/connexion-creation";
import {LienStorageProvider} from "../../providers/lien-storage/lien-storage";

/**
 * Generated class for the AjoutBiblioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajout-biblio',
  templateUrl: 'ajout-biblio.html',
})
export class AjoutBiblioPage {
  public maisons:Maison[] = new Array();
  public proprios: Lecteur[] = new Array();

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private lienFirebaseService: LienFireBaseProvider,
              private lienStorageService: LienStorageProvider,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) {
    this.lienStorageService.getMaisons().then(data => {
      this.maisons = data;
    });
    this.lienStorageService.getLecteurs().then(data => {
      this.proprios = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjoutBiblioPage');
  }

  onSubmitForm(form: NgForm) {
    console.log("ajout biblio", form.value);

    this.lienFirebaseService.addBiblio(form)
      .then( res => {
        // TODO
        //this.lienStorageService.setBiblio(res.data);
        let toast = this.toastCtrl.create({
          message: 'Biblio add successfully',
          duration: 3000
        });
        toast.present();
        //  this.resetFields();
        console.log("ajoute Biblio dans la BD OK ...");
        this.navCtrl.push('ListBiblioPage');

      }, err => {
        console.log(err);
      })
  }

  nouvelleMaison() {
    let alert = this.alertCtrl.create({
      title: 'Nouvelle Maison',
      inputs: [
        {
          name: 'nom',
          placeholder: 'Nom'
        },
        {
          name: 'adresse',
          placeholder: 'Adresse',
          type: 'text'
        },
        {
          name: 'proprio',
          placeholder: 'Nom propriétaire',
          type: 'text'
        }
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
          text: 'Créer',
          handler: data => {
            if (data.nom != null) {
              this.lienFirebaseService.addMaison(data.nom, data.adresse, data.proprio);
              // TODO : then --> this.lienStorageService.setMaison();
            } else {
              console.log("il faut au moins un nom pour créer une Maison");
              let toast = this.toastCtrl.create({
                message: 'Maison add successfully',
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
}
