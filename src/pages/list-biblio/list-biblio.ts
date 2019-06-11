import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Lecteur} from "../../models/Lecteur";
import {Biblio} from "../../models/Biblio";
import {LienFireBaseProvider} from "../../providers/lien-fire-base/lien-fire-base";
import {Maison} from "../../models/Maison";

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
  public listMaison:Maison[] = new Array();
  public listBiblio:Biblio[] = new Array();

  maisonExpandHeight: number = 100;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private lienFirebaseService: LienFireBaseProvider) {

    this.listMaison = this.lienFirebaseService.retrieveMaison();
    this.listBiblio = this.lienFirebaseService.retrieveBiblio();

    console.log('list de maison : ', this.listMaison);
    console.log('list de biblio : ', this.listBiblio);


    /*    this.listMaison = [
          { nom:"Bougnoux", id:1, expanded: false},
          { nom:"Gerbau", id:2, expanded: false},
          { nom:"MtpEva", id:4, expanded: false},
          { nom:"AppartClermont", id:5, expanded: false}
        ];

        this.listBiblio = [
          { nom:"Palier", id:1},
          { nom:"Salon", id:2},
        ];*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListBiblioPage');
  }

  expandItem(maison){
    this.listMaison.map((listBiblio) => {
      if(maison == listBiblio){
        listBiblio.expanded = !listBiblio.expanded;
      } else {
        listBiblio.expanded = false;
      }
      return listBiblio;
    });
  }

  onClickBiblio(id: any) {
    this.navCtrl.push('ListLivrePage', {'id':id});
  }
}
