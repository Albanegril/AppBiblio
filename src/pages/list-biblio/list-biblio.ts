import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Lecteur} from "../../models/Lecteur";
import {Biblio} from "../../models/Biblio";
import {LienFireBaseProvider} from "../../providers/lien-fire-base/lien-fire-base";
import {Maison} from "../../models/Maison";
import {LienStorageProvider} from "../../providers/lien-storage/lien-storage";

/**
 * Generated class for the ListBiblioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-biblio',
  templateUrl: 'list-biblio.html',
})
export class ListBiblioPage {
  public listMaison:Maison[] = [];
  public listBiblio:Biblio[] = [];

  //TODO valeur fix ne permert pas l'affichage de plus de 2 biblios par maison ...
  maisonExpandHeight: number = 100;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private lienStorageService: LienStorageProvider) {

    this.lienStorageService.getLivres().then(data => {
      console.log('list de livres : ', data);
    });

    this.lienStorageService.getMaisons().then(data => {
      this.listMaison = data;
      console.log('list de maison : ', this.listMaison);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListBiblioPage');
  }

  expandItem(maison){
    this.lienStorageService.getBiblioDeM(maison.id_M).then(data => {
      this.listBiblio = data;
      this.listMaison.map((listBiblio) => {
        if(maison == listBiblio){
          listBiblio.expanded = !listBiblio.expanded;
        } else {
          listBiblio.expanded = false;
        }
        return listBiblio;
      });
    });
  }

  onClickBiblio(id: any) {
    this.navCtrl.push('ListLivrePage', {'id':id});
  }
}
