import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {LienFireBaseProvider} from "../../providers/lien-fire-base/lien-fire-base";

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private lienFirebaseService: LienFireBaseProvider,
              private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjoutBiblioPage');
  }

  onSubmitForm(form: NgForm) {
    console.log(form.value);
    console.log("ajout biblio");

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
    this.lienFirebaseService.addBiblioToMaison(form.value.maison)
      .then( res => {
        let toast = this.toastCtrl.create({
          message: 'Biblio add to Maison successfully',
          duration: 3000
        });
        toast.present();
        //  this.resetFields();
        console.log("ajoute Biblio to Maison dans la BD OK ...")
      }, err => {
        console.log(err);
      })
    // this.navCtrl.push('FicheBiblioPage');
    // vers ajout livre ?
  }
}
