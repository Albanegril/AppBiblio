import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Livre} from "../../models/Livre";
import * as firebase from 'firebase';

/*
  Generated class for the LienFireBaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LienFireBaseProvider {
  livre$ = new Subject<Livre[]>();
  livreList: Livre[];

  constructor(public http: HttpClient) {
    console.log('Hello LienFireBaseProvider Provider');
  }

  emitLivres() {
    this.livre$.next(this.livreList.slice());
  }

/*  saveDataLivres() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('livres').set(this.livreList).then(
        (data: DataSnapshot) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  retrieveDataLivres() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('livres').once('value').then(
        (data: DataSnapshot) => {
          this.livreList = data.val();
          this.emitLivres();
          resolve('Données récupérées avec succès !');
        }, (error) => {
          reject(error);
        }
      );
    });
  }*/



}
