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
    this.listLectures = this.lienFirebaseService.retrieveLectureDeLec(this.navParams.get('id'));
    console.log('list de lectures : ', this.listLectures);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListLecturesPage');
  }

  onClickLecture(idLiv: string) {

  }

  supprimer(id: string) {

  }

  modifier(id: string) {

  }
}
