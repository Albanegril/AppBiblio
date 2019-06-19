import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LienFireBaseProvider} from "../../providers/lien-fire-base/lien-fire-base";
import {Livre} from "../../models/Livre";
import {el} from "@angular/platform-browser/testing/src/browser_util";

/**
 * Generated class for the RechercheLivrePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recherche-livre',
  templateUrl: 'recherche-livre.html',
})
export class RechercheLivrePage {
  public listLivre:Livre[] = [];
  searchQuery: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private lienFirebaseService: LienFireBaseProvider) {
     this.lienFirebaseService.retrieveLivres().then(data => {
      this.listLivre = data;
      console.log('list de livre : ', this.listLivre);
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RechercheLivrePage');
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.lienFirebaseService.retrieveLivres().then(data => {
      this.listLivre = data;
      console.log('list de livre : ', this.listLivre);

      // set val to the value of the searchbar
      const val = ev.target.value;

      // if the value is an empty string don't filter the items

      if (val && val.trim() != '') {
        this.listLivre = this.listLivre.filter((livre) => {
          console.log('recherche var : ', livre.titre.toLowerCase().indexOf(val.toLowerCase()));
          return (livre.titre.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }

    });
  }

  onClickLivre(idL: string) {
    this.navCtrl.push('FicheLivrePage', {'id':idL});
  }
}
