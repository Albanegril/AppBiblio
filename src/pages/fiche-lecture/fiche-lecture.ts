import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {LienFireBaseProvider} from "../../providers/lien-fire-base/lien-fire-base";
import {Livre} from "../../models/Livre";
import {Lecture} from "../../models/Lecture";

/**
 * Generated class for the FicheLecturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fiche-lecture',
  templateUrl: 'fiche-lecture.html',
})
export class FicheLecturePage {
  public lecture:Lecture = new Lecture();

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private lienFirebaseService: LienFireBaseProvider,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) {

    console.log('idLec : ', this.navParams.get('idLec'));
    console.log('idLiv : ', this.navParams.get('idLiv'));
    this.lecture = lienFirebaseService.retreiveLectureLivDeLec(this.navParams.get('idLiv'), this.navParams.get('idLec'));
    console.log('Lecture data : ', this.lecture);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FicheLecturePage');
  }

}
