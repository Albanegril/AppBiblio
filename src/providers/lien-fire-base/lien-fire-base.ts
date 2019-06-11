import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Livre} from "../../models/Livre";

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import {Lecture} from "../../models/Lecture";
import {Lecteur} from "../../models/Lecteur";
import {map} from "rxjs/operators";
import {Biblio} from "../../models/Biblio";
import {Maison} from "../../models/Maison";

/*
  Generated class for the LienFireBaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LienFireBaseProvider {
  //data: any;
  //livre: Observable<Livre[]>;

  constructor(public http: HttpClient,
             public afs: AngularFirestore
              ) {
    console.log('Hello LienFireBaseProvider Provider');
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
            console.log("afs.collection : ", res.id);
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
    let docRef = this.afs.collection('Livre').doc('Fa1vm1fYmsuKwCUuup31').collection('Livre').doc(idL);
    let livre :Livre = new Livre();

    docRef.ref.get().then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        console.log("Document titre :", doc.data().titre);

        livre.setLivre(doc.id, doc.data().titre, "null", "null", doc.data().editeur, doc.data().langue,
          doc.data().date, "null", doc.data().nbPages, "null", doc.data().resume, doc.data().auteurs,
          [], "null", doc.data().cover, "null", doc.data().proprioL, []);
          console.log("livre titre :", livre.titre);

      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });

    return livre;
  }

  retrieveLivres() : Livre[]{
    let livres : Livre[] = new Array();

    this.afs.collection('Livre').doc('Fa1vm1fYmsuKwCUuup31').collection('Livre').ref.get().then(data => {
      for(let list of data.docs){
        let listData = list.data();
        console.log('Livre data : ', list.data());
        console.log('Livre nom : ', list.data().titre);
      }});

    return livres;
  }

  retrieveBiblio() : Biblio[]{
    let biblios : Biblio[] = new Array();

    this.afs.collection('Biblio').doc('VWf30cTxBYV5CidHmfKT').collection('Biblio').ref.get().then(data => {
      for(let list of data.docs){
        console.log('Biblio data : ', list.data());
        let biblio:Biblio = new Biblio();
        biblio.setBiblio(list.id, list.data().nom, 0, null, []);
        biblios.push(biblio);
        console.log('Biblio data bis : ', biblio);
      }});

    return biblios;
  }

  retrieveMaison() {
    let maisons : Maison[] = new Array();

    this.afs.collection('Maison').doc('bv394kJ4Bv6oJ0Dv0kWI').collection('Maison').ref.get().then(data => {
      for(let list of data.docs){
        console.log('Maison data : ', list.data());
        let maison:Maison = new Maison();
        maison.setMaison(list.id, list.data().nom, "null", null, []);
        maisons.push(maison);
        console.log('Maison data bis : ', maison);
      }});

    return maisons;
  }

  rechercheLivre(){
    /*this.teamAdminCollection = fireStore.collection<any>('userProfile', ref =>
      ref.where('titre', '==', true));*/
  }

}
