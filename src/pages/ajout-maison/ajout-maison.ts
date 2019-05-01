import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {LienFireBaseProvider} from "../../providers/lien-fire-base/lien-fire-base";

/**
 * Generated class for the AjoutMaisonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajout-maison',
  templateUrl: 'ajout-maison.html',
})
export class AjoutMaisonPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private lienFirebaseService: LienFireBaseProvider,
              private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjoutMaisonPage');
  }

  // en faire un modal ?
  onSubmitForm(form: NgForm) {
    console.log(form.value);
    console.log("ajout Maison");

    // ajout BD
    this.lienFirebaseService.addMaison(form)
      .then( res => {
        let toast = this.toastCtrl.create({
          message: 'Maison add successfully',
          duration: 3000
        });
        toast.present();
        //  this.resetFields();
        console.log("ajoute Maison dans BD OK ...")
      }, err => {
        console.log(err);
      })
    // this.navCtrl.push('ListeBiblioPage');
    // vers ajout biblio ?
  }
}
