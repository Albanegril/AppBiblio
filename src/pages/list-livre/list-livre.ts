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
  public listLivre:Livre[] = new Array();

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private lienFirebaseService: LienFireBaseProvider) {

    console.log(this.navParams.get('id'));
    this.listLivre = this.lienFirebaseService.retrieveLivres(this.navParams.get('id'));
    console.log('list de livre : ', this.listLivre);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListLivrePage');
  }

/*  private getListLivre(idB: any) {

   this.listLivre = [
      { titre:"titre1", id:1, date:"1998", langue:"FR", cover:"cover1", auteur:"Auteur1", sujets:"sujets" },
      { titre:"titre2", id:2, date:"1998", langue:"FR", cover:"cover2", auteur:"Auteur2", sujets:"sujets" },
    ];
  }*/

  onClickLivre(idL: string) {
    this.navCtrl.push('FicheLivrePage', {'id':idL});
  }

  ajouterLivre() {
    // pour le moment le passage de l'ID biblio n'est pas géré au niveau des pages d'ajout
    this.navCtrl.push('AjoutLivreOptionsPage', {'id':this.navParams.get('id')});
  }

  lire(idL: string) {
    // créé une lecture du livre pour le lecteur connecté
    this.navCtrl.push('FicheLivrePage', {'id':idL});
  }

  deplacer(idL: string) {
    // déplacement rapide ? alerts ou modal
    this.navCtrl.push('FicheLivrePage', {'id':idL});
  }
}
