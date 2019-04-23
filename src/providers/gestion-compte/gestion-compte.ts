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

  connexionLecteur(email: string, mdp: string) {
    return new Promise((resolve, reject) => {
      console.log(`gestion connexion email <${email}> mdp<${mdp}>`);
      firebase.auth().signInWithEmailAndPassword(email, mdp).then(
        (user) => {
          resolve(user);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  creationLecteur(email: string, mdp: string) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, mdp)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  deconnexion() {
    firebase.auth().signOut();
  }

}
