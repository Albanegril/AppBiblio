import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {LienFireBaseProvider} from "../../providers/lien-fire-base/lien-fire-base";
import {Livre} from "../../models/Livre";
import {Lecture} from "../../models/Lecture";
import {LienStorageProvider} from "../../providers/lien-storage/lien-storage";

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
  public livre:Livre = new Livre();

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private lienFirebaseService: LienFireBaseProvider,
              private lienStorageService: LienStorageProvider,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) {

    this.lienStorageService.getLectureLivDeLec(this.navParams.get('idLiv'), this.navParams.get('idLec')).
    then(data => {
      this.lecture = data;
      this.livre = this.navParams.get('livre');
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FicheLecturePage');
  }

  supprimer() {
    // TODO
  }

  editer() {
    // TODO
  }
}
