import { Component } from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {LienFireBaseProvider} from "../../providers/lien-fire-base/lien-fire-base";
import {Maison} from "../../models/Maison";
import {Lecteur} from "../../models/Lecteur";
import {ConnexionCreationPage} from "../connexion-creation/connexion-creation";

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
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) {
    this.maisons = this.lienFirebaseService.retrieveMaison();
    this.proprios = this.lienFirebaseService.retrieveLecteur();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjoutBiblioPage');
  }

  onSubmitForm(form: NgForm) {
    console.log("ajout biblio", form.value);
    console.log("ajout biblio", form.value.nomB);

    // ajout BD
    this.lienFirebaseService.addBiblio(form)
      .then( res => {
        let toast = this.toastCtrl.create({
          message: 'Biblio add successfully',
          duration: 3000
        });
        toast.present();
        //  this.resetFields();
        console.log("ajoute Biblio dans la BD OK ...")
      }, err => {
        console.log(err);
      })

    // this.navCtrl.push('FicheBiblioPage');
    // vers ajout livre ?
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
            } else {
              console.log("il faut au moins un nom pour créer une Maison");
              // créer un toast
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }
}
