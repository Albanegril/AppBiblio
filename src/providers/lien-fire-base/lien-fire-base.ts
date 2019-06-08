import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Livre} from "../../models/Livre";

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import {Lecture} from "../../models/Lecture";
import {Lecteur} from "../../models/Lecteur";
import {map} from "rxjs/operators";

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

  private livreCollection: AngularFirestoreCollection<Livre>;
  livre: Observable<Livre[]>;

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
      console.log(form.value);
      this.afs.collection('/Livre/Fa1vm1fYmsuKwCUuup31/Livre').add(
      {
        titre: form.value.titre,
        //isbn: form.value.isbn,
        editeur: form.value.editeur,
        langue: form.value.langue,
        date: form.value.date,
        //edition: form.value.edition,
        nbPages: form.value.nbPages,
        resume: form.value.resume,
        auteurs: form.value.auteurs,
        cover: form.value.cover,
        proprioL: form.value.proprioL,
        biblioL: form.value.biblioL

      })
        .then(
          (res) => {
            console.log("afs.collection : " + res.id);
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

  addBiblioToMaison(id) {
  // + id biblio ??
    // créé maison si n'existe pas !
    // avoir proposer création avant ?
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/Maison/bv394kJ4Bv6oJ0Dv0kWI/Maison').add({
        BiblioListe: id
      })
        .then(
          (res) => {
            resolve(res)
          },
          err => reject(err)
        )
    });
  }

  getLivre(idL) : Livre{
    //return new Promise<Livre>((resolve, reject) => {
      this.data = this.afs.collection('Livre').doc('Fa1vm1fYmsuKwCUuup31').collection('Livre').doc(idL)
      /*  .then(
          (res) => {
            resolve(res)
          },
          err => reject(err)
        )*/
   // });
    console.log('Retreive data : ' + this.data);

    return this.data;

  }

  retrieveLivres(){
    this.data = this.afs.collection<any>('/Livre/Fa1vm1fYmsuKwCUuup31/Livre');
    console.log('Retreive data : ' + this.data);

    this.livreCollection = this.afs.collection<Livre>('/Livre/Fa1vm1fYmsuKwCUuup31/Livre');
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
     this.livreCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Livre;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  rechercheLivre(){
    /*this.teamAdminCollection = fireStore.collection<any>('userProfile', ref =>
      ref.where('teamAdmin', '==', true));*/
  }


}
