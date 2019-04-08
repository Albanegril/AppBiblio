import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormArray, FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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

    this.navCtrl.push('FicheLivrePage');
  }


}
