import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Livre} from "../../models/Livre";

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
    return this.storage.set(`livre ${ livre.id_L }`, livre);
  }

  getlivre(id:string): Promise<Livre>{

    return new Promise<Livre>((resolve, reject) => {
        let livre:Livre = new Livre();

        return this.storage.get('livre ' + id).then((val) => {
          console.log('livre : ', val);
          // livre.setLivre();
          resolve(livre);
        }).catch((error) => {
        console.log("Error getting document:", error);
      })
    });
  }

  removeLivre(id:string) {
    this.storage.remove(`livre ${ id }`);
  }

  setLivres(livres:Livre[]){
    for(let livre of livres){
      this.storage.set(`livre ${ livre.id_L }`, livre);
    }
  }

  getlivres(): Promise<Livre[]>{

    return new Promise<Livre[]>((resolve, reject) => {

      let livres: Livre[] = [];
      let livre:Livre = new Livre();

      // faire un if contient livre ?
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
