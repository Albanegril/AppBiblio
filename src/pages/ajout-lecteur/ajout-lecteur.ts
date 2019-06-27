import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {LienFireBaseProvider} from "../../providers/lien-fire-base/lien-fire-base";
import {NgForm} from "@angular/forms";

/**
 * Generated class for the AjoutLecteurPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajout-lecteur',
  templateUrl: 'ajout-lecteur.html',
})
export class AjoutLecteurPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private lienFirebaseService: LienFireBaseProvider,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjoutLecteurPage');
  }

  onSubmitForm(form: NgForm) {
    console.log("ajout lecteur", form.value);

    // ajout BD
    this.lienFirebaseService.addLecteur(form)
      .then( res => {
        let toast = this.toastCtrl.create({
          message: 'Lecteur add successfully',
          duration: 3000
        });
        toast.present();
        //  this.resetFields();
        console.log("ajoute Lecteur dans la BD OK ...");
        this.navCtrl.pop();
        this.navCtrl.push('ListLecteursPage');
      }, err => {
        console.log(err);
      })

  }

}
