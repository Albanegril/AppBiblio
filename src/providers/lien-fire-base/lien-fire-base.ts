import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Livre} from "../../models/Livre";

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
   livre$ = new Subject<Livre[]>();
   data: any;
  livreList: Livre[];

  constructor(public http: HttpClient,
             public afs: AngularFirestore
              ) {
    console.log('Hello LienFireBaseProvider Provider');
    this.retrieveLivres();
  }

/*  emitLivres() {
    this.livre$.next(this.livreList.slice());
  }*/

  addLivre(form){
    return new Promise<any>((resolve, reject) => {

      this.afs.collection('/Livre/Fa1vm1fYmsuKwCUuup31/Livre').add(
      {
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
            console.log("!!!!!! afs.collection" + res);
            resolve(res)
          },
          err => reject(err)
        )
    })
  }

  addLecteur(form){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/Lecteur/e1IWZmEdiqjLeTv4xs0F/Lecteur').add({
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
      this.afs.collection('/Biblio/VWf30cTxBYV5CidHmfKT/Biblio').add({
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
      this.afs.collection('/Maison/bv394kJ4Bv6oJ0Dv0kWI/Maison').add({
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

  retrieveLivres() {
    this.data = this.afs.doc<any>('/Livre/Fa1vm1fYmsuKwCUuup31');
    console.log('Retreive data : ' + this.data);
/*    return new Promise((resolve, reject) => {
      this.data = this.afs.doc<any>('/Livre/Fa1vm1fYmsuKwCUuup31')
        .then(
        (data: any) => {
          this.livreList = data.val();
          console.log('Retreive data : ' + this.data);

          resolve('Données récupérées avec succès !');
        }, (error) => {
          reject(error);
        }
      );
    });*/
  }

  rechercheLivre(){
    /*this.teamAdminCollection = fireStore.collection<any>('userProfile', ref =>
      ref.where('teamAdmin', '==', true));*/
  }

}
