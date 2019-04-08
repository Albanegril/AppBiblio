import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NgForm} from "@angular/forms";

/**
 * Generated class for the ConnexionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-connexion',
  templateUrl: 'connexion.html',
})
export class ConnexionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnexionPage');
  }

/*
  goBack(){
    console.log(`goBack`);
    this.navCtrl.pop();
  }
*/

  onSubmitForm(form: NgForm) {
    console.log(form.value);
    console.log("connexion compte");
    //TODO

    this.navCtrl.push('ListBiblioPage').then(()=>{
      this.navCtrl.setRoot('ListBiblioPage');
    });
  }

  onClickCreationCompte() {
    // TODO
  }

  onClickPourquoiCompte() {
    // TODO
  }
}
