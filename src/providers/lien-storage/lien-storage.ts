import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Livre} from "../../models/Livre";
import { Storage } from '@ionic/storage';
/*
  Generated class for the LienStorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LienStorageProvider {

  constructor(public http: HttpClient,
              private storage: Storage) {
    console.log('Hello LienStorageProvider Provider');

  }

  setLivre(livre:Livre): Promise<any>{
    let driver = this.storage.driver;
    console.log("DRIVER : ", driver);
    return new Promise<any>((resolve, reject) => {
      return this.storage.set(`livre ${livre.id_L}`, livre).then(
        (res) => {
          resolve(res)
        },
        err => reject(err)
      );
     // console.log("result : ", result);
    });
  }

  getlivre(id:string): Promise<Livre>{
    let keys = this.storage.keys();
    console.log("KEYS : ", keys);
    return new Promise<Livre>((resolve, reject) => {
        let livre:Livre = new Livre();
        let idStored = 'livre ' + id;
       // console.log("idStored : ", idStored)
        return this.storage.get(idStored).then((val) => {
        //  console.log('livre : ', val);
          // livre.setLivre(); //TODO ?
          resolve(val);
        }).catch((error) => {
        console.log("Error getting document:", error);
      })
    });
  }

  removeLivre(id:string) {
    return new Promise<any>((resolve, reject) => {
      this.storage.remove(`livre ${id}`);
    });
  }

  setLivres(livres:Livre[]){
   // console.log("livres : ", livres);
    return new Promise<any>((resolve, reject) => {
      for(let livre of livres){
        let livreStored = this.storage.set(`livre ${ livre.id_L }`, livre);
       // console.log("livreStored :", livreStored);
      }
    });
  }

  getlivres(): Promise<Livre[]>{
    return new Promise<Livre[]>((resolve, reject) => {

      let livres: Livre[] = [];
      let livre:Livre = new Livre();

      // faire un if contient livre ?
     // console.log("KEYS : ", this.storage.keys());
      return this.storage.get('livre ' ).then((val) => {
        console.log('livre : ', val);
        // livre.setLivre();
        livres.push(livre);
        resolve(livres);
      }).catch((error) => {
        console.log("Error getting document:", error);
      })
    });
  }
}
