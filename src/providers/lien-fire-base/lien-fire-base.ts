import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Livre} from "../../models/Livre";
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {Lecture} from "../../models/Lecture";
import {Lecteur} from "../../models/Lecteur";

/*
  Generated class for the LienFireBaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LienFireBaseProvider {
  // livre$ = new Subject<Livre[]>();
  // livreList: Livre[];

  constructor(public http: HttpClient, public afs: AngularFirestore) {
    console.log('Hello LienFireBaseProvider Provider');
  }

/*  emitLivres() {
    this.livre$.next(this.livreList.slice());
  }*/

  addLivre(form){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/Livre').add({
        titre: form.titre,
        isbn: form.isbn,
        editeur: form.editeur,
        langue: form.langue,
        date: form.date,
        edition: form.edition,
        nbPages: form.nbPages,
        resume: form.resume,
        auteurs: form.auteurs,
        cover: form.cover,
        proprioL: form.proprioL,
        biblioL: form.biblioL

    })
        .then(
          (res) => {
            resolve(res)
          },
          err => reject(err)
        )
    })
  }

  addLecteur(form){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/Livre').add({
        nom: form.nom,
        prenom: form.prenom,
        pseudo: form.pseudo,
        mdp: form.mdp,
        lectures: null,
        avatar: form.avatar
      })
        .then(
          (res) => {
            resolve(res)
          },
          err => reject(err)
        )
    })
  }

  addBiblio(form){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/Livre').add({
        nomB: form.nom,
        nbEtages: form.nbEtages,
        proprioB: form.proprioB,
        livres: null
      })
        .then(
          (res) => {
            resolve(res)
          },
          err => reject(err)
        )
    })
  }

  addMaison(form){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/Livre').add({
        nomM: form.nomM,
        adresse: form.adresse,
        proprioM: form.proprioM
      })
        .then(
          (res) => {
            resolve(res)
          },
          err => reject(err)
        )
    })
  }

  
/*  retrieveDataLivres() {
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
