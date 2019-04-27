import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormArray, FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {LienFireBaseProvider} from "../../providers/lien-fire-base/lien-fire-base";

/**
 * Generated class for the AjoutLivrePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajout-livre',
  templateUrl: 'ajout-livre.html',
})
export class AjoutLivrePage{

  constructor(private lienFirebaseService: LienFireBaseProvider,
              public navCtrl: NavController, public navParams: NavParams,
              private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjoutLivrePage');
  }

  onSubmitForm(form: NgForm) {
    console.log(form.value);
    console.log("ajout livre");

    // ajout BD
    // verification des entrées min + si existant ?
    //TODO
    /*this.lienFirebaseService.addLivre(form)
      .then( res => {
        let toast = this.toastCtrl.create({
          message: 'Livre add successfully',
          duration: 3000
        });
        toast.present();
      //  this.resetFields();*/
    console.log("ajoute du livre dans la BD...")
        this.navCtrl.push('FicheLivrePage');
      /*}, err => {
        console.log(err)
      })*/
  }

}
