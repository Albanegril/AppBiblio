import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LienFireBaseProvider} from "../../providers/lien-fire-base/lien-fire-base";
import {LienStorageProvider} from "../../providers/lien-storage/lien-storage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              private lienFirebaseService: LienFireBaseProvider,
              private lienStorageService: LienStorageProvider) {
    this.getAllData().then(
      ()=>{
        console.log("Syncronized");
        //this.lienStorageService.getAllKeys();
      });
  }

  getAllData(){
    console.log("DRIVER : ", this.lienStorageService.getDriver());

    return new Promise<any>((resolve, reject) => {
      //Storage Livres
      this.lienFirebaseService.retrieveLivres().then(data => {
        this.lienStorageService.setLivres(data).then(dataBis => {
          console.log('data: ', dataBis);
        });
      });
      //Storage Biblios
      this.lienFirebaseService.retrieveBiblio().then(data => {
        this.lienStorageService.setBiblios(data).then(dataBis => {
          console.log('data: ', dataBis);
        });
      });
      //Storage Maisons
      this.lienFirebaseService.retrieveMaisons().then(data => {
        this.lienStorageService.setMaisons(data).then(dataBis => {
          console.log('data: ', dataBis);
        });
      });
      //Storage Lecteurs
      this.lienFirebaseService.retrieveLecteurs().then(data => {
        this.lienStorageService.setLecteurs(data).then(dataBis => {
          console.log('data: ', dataBis);
        });
      });
      //Storage Lectures
      this.lienFirebaseService.retrieveLectures().then(data => {
        this.lienStorageService.setLectures(data).then(dataBis => {
          console.log('data: ', dataBis);
        });
      });
    });
  }


  onClick(){
    this.navCtrl.push('ConnexionPage');
  }

}
