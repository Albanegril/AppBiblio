import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Livre} from "../../models/Livre";
import {Lecture} from "../../models/Lecture";
import {LienFireBaseProvider} from "../../providers/lien-fire-base/lien-fire-base";

/**
 * Generated class for the ListLecturesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-lectures',
  templateUrl: 'list-lectures.html',
})
export class ListLecturesPage {
  public listLectures:Lecture[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private lienFirebaseService: LienFireBaseProvider) {

    console.log(this.navParams.get('id'));
 //   this.lienFirebaseService.retrieveLectureDeLec(this.navParams.get('id')).
    this.lienFirebaseService.retrieveLecture().
    then(data => {
      this.listLectures = data;
      console.log('list de lectures : ', this.listLectures);
      for(let lecture of this.listLectures){
        this.lienFirebaseService.getLivre(lecture.idLiv).then(data => {
          //TODO /!\ l'id du livre est perdu pr cet objet...
          lecture.idLiv = data.titre;
          console.log('titre livre : ', lecture.idLiv);
        });
        this.lienFirebaseService.retrieveLecteurID(lecture.idLec).then(data => {
          //TODO /!\ l'id du lecteur est perdu pr cet objet ...
          lecture.idLec = data.pseudo;
          console.log('pseudo lecteur : ', lecture.idLec);
        });
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListLecturesPage');
  }

  onClickLecture(id: string) {
    //TODO gérer la fiche lecteur selon l'id lecture
    //this.navCtrl.push('FicheLecturePage', {'id':id});
  }

  supprimer(id: string) {

  }

  modifier(id: string) {

  }
}
