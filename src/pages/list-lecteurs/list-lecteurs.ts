import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Livre} from "../../models/Livre";
import {Lecteur} from "../../models/Lecteur";
import {LienFireBaseProvider} from "../../providers/lien-fire-base/lien-fire-base";

/**
 * Generated class for the ListLecteursPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-lecteurs',
  templateUrl: 'list-lecteurs.html',
})
export class ListLecteursPage {
  public listLecteurs:Lecteur[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private lienFirebaseService: LienFireBaseProvider) {

    this.lienFirebaseService.retrieveLecteur().then(data => {
      this.listLecteurs = data;
      console.log('list lecteurs : ', this.listLecteurs);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListLecteursPage');
  }

  onClickLecteur(id: string) {
    
  }

  modifier(id: string) {
    
  }

  supprimer(id: string) {
    
  }
}
