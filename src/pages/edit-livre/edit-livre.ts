import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Livre} from "../../models/Livre";
import {Biblio} from "../../models/Biblio";
import {Lecteur} from "../../models/Lecteur";
import {LienFireBaseProvider} from "../../providers/lien-fire-base/lien-fire-base";
import {Camera} from "@ionic-native/camera";
import {NgForm} from "@angular/forms";

/**
 * Generated class for the EditLivrePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-livre',
  templateUrl: 'edit-livre.html',
})
export class EditLivrePage {
  public livre:Livre = new Livre();
  public biblios:Biblio[] = [];
  public proprios: Lecteur[] = [];
  options: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private lienFirebaseService: LienFireBaseProvider,
              private toastCtrl: ToastController,
              private camera: Camera) {
    this.livre = this.navParams.get('data');
    console.log('livre == ', this.livre);
    this.biblios = this.lienFirebaseService.retrieveBiblio();
    this.proprios = this.lienFirebaseService.retrieveLecteur();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditLivrePage');
  }

  supprimer(idL: string) {

  }

  modifier(form: NgForm) {
    console.log("modif livre", form.value);

    this.lienFirebaseService.modifierLivre(form, this.livre.id_L)
      .then( res => {
        let toast = this.toastCtrl.create({
          message: 'Livre add successfully',
          duration: 3000
        });
        toast.present();
        console.log("livre modifier")
        this.navCtrl.push('FicheLivrePage', {'data':res, 'id':this.navParams.get('id')});
      }, err => {
        console.log(err);
      })
  }
}
