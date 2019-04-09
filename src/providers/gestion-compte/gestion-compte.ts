import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

/*
  Generated class for the GestionCompteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GestionCompteProvider {
  isConnect = false;

  constructor(public http: HttpClient) {
    console.log('Hello GestionCompteProvider Provider');
  }

  connexionLecteur(pseudo: string, mdp: string) {
    return new Promise((resolve, reject) => {
      /*firebase.auth().createUserWithEmailAndPassword(email, password).then(
        (user) => {
          resolve(user);
        },
        (error) => {
          reject(error);
        }
      );*/
    });
  }

  creationLecteur(pseudo: string, mdp: string) {
    return new Promise((resolve, reject) => {
      /*firebase.auth().signInWithEmailAndPassword(email, password).then(
        (user) => {
          resolve(user);
        },
        (error) => {
          reject(error);
        }
      );*/
    });
  }

  deconnexion() {
   // firebase.auth().signOut();
  }

}
