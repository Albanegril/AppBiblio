import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LienFireBaseProvider} from "../../providers/lien-fire-base/lien-fire-base";
import {Livre} from "../../models/Livre";

/**
 * Generated class for the ListLivrePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-livre',
  templateUrl: 'list-livre.html',
})
export class ListLivrePage {
  public listLivre:Livre[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private lienFirebaseService: LienFireBaseProvider) {

    console.log(this.navParams.get('id'));
    // pb car non sychrno ??
    this.lienFirebaseService.retrieveLivresDeB(this.navParams.get('id')).
    then(data => {
      this.listLivre = data;
      console.log('list de livre : ', this.listLivre);
    });

     //this.listLivre = this.lienFirebaseService.retrieveLivres();
     //console.log('list de livre : ', this.listLivre);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListLivrePage');
  }

  onClickLivre(idL: string) {
    this.navCtrl.push('FicheLivrePage', {'id':idL});
  }

  ajouterLivre() {
    //TODO
    // pour le moment le passage de l'ID biblio n'est pas géré au niveau des pages d'ajout
    this.navCtrl.push('AjoutLivreOptionsPage', {'id':this.navParams.get('id')});
  }

  lire(idL: string) {
    //TODO
    // créé une lecture du livre pour le lecteur connecté
    this.navCtrl.push('FicheLivrePage', {'id':idL});
  }

  deplacer(idL: string) {
    //TODO
    // déplacement rapide ? alerts ou modal
    this.navCtrl.push('FicheLivrePage', {'id':idL});
  }
}
