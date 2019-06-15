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
        nom: form.value.nom,
        prenom: form.value.prenom,
        pseudo: form.value.pseudo,
        mdp: form.value.mdp,
        lectures: null,
        avatar: form.value.avatar
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
      console.log('nomB :', form.nomB);
      console.log('nomB :', form.value.nomB);
      this.afs.collection('/Biblio/VWf30cTxBYV5CidHmfKT/Biblio').add({
        nomB: form.value.nomB,
        nbEtages: form.value.nbEtages,
        proprioB: form.value.proprioB,
        livres: null,
      })
        .then(
          (res) => {
            this.addMaisonToBiblio(form.value.maison, res.id);
            resolve(res)
          },
          err => reject(err)
        )
    })
  }

  addMaison(nom, adresse, proprio){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/Maison/bv394kJ4Bv6oJ0Dv0kWI/Maison').add({
        nomM: nom,
        adresse: adresse,
        proprioM: proprio,
        expanded: false
      })
        .then(
          (res) => {
            resolve(res)
          },
          err => reject(err)
        )
    })
  }

  addMaisonToBiblio(idM, idB) {
  // + id biblio ??
    // créé maison si n'existe pas !
    // avoir proposer création avant ?
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('Biblio').doc('VWf30cTxBYV5CidHmfKT').collection('Biblio').doc(idM).ref.set({
        maisonB: idM
      }, { merge: true })
        .then(
          (res) => {
            resolve(res)
          },
          err => reject(err)
        )
    });

    // utiliser la fct update plutot que set ?
/*    this.afs.collection('Maison').doc('bv394kJ4Bv6oJ0Dv0kWI').collection('Maison').doc(idM).update({
      "Biblio.[i]": idB
    })
      .then(function() {
        console.log("Document successfully updated!");
      });*/
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
          [], "null", doc.data().cover, "null", doc.data().proprioL, [], doc.data().biblioL);
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

  retrieveLivresDeB(idB) : Livre[]{
    let livres : Livre[] = new Array();
    console.log('IdB : ', idB);

/*    this.afs.collection('Livre').doc('Fa1vm1fYmsuKwCUuup31').collection('Livre').where("biblioL", "==", idB)
      .ref.get().then(data => {
      for(let list of data.docs){
        console.log('Livre data : ', list.data());
        let livre:Livre = new Livre();
        livre.setLivre(list.id, list.data().titre, "null", "null", list.data().editeur, list.data().langue,
          list.data().date, "null", list.data().nbPages, "null", list.data().resume, list.data().auteurs,
          [], "null", list.data().cover, "null", list.data().proprioL, [], list.data().biblioL);
        livres.push(livre);
        console.log('Livre data bis : ', livre);
      }});*/

      let data:any;

      data = this.afs.collection('Livre').doc('Fa1vm1fYmsuKwCUuup31').collection('Livre').ref.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          let livre:Livre = new Livre();
          livre.setLivre(doc.id, doc.data().titre, "null", "null", doc.data().editeur, doc.data().langue,
            doc.data().date, "null", doc.data().nbPages, "null", doc.data().resume, doc.data().auteurs,
            [], "null", doc.data().cover, "null", doc.data().proprioL, [], doc.data().biblioL);
          if(livre.biblio_L==idB){
            livres.push(livre);
            console.log("ajouté !");
          }
          console.log('Livre data bis : ', livre);
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });

      console.log('data', data);

    return livres;
  }

  retrieveBiblio() : Biblio[]{
    let biblios : Biblio[] = new Array();

    this.afs.collection('Biblio').doc('VWf30cTxBYV5CidHmfKT').collection('Biblio').ref.get().then(data => {
      for(let list of data.docs){
        console.log('Biblio data : ', list.data());
        let biblio:Biblio = new Biblio();
        biblio.setBiblio(list.id, list.data().nomB, 0, null, list.data().maisonB);
        biblios.push(biblio);
        console.log('Biblio data bis : ', biblio);
      }});

    return biblios;
  }

  retrieveBiblioDeM(idM:string) : Biblio[]{
    // get info maison idM
    // foreach champs Biblio de maison idM
    // add dans list biblio idB
    // foreach biblio idB recupérer info + push dans list
    let biblios : Biblio[] = new Array();

    this.afs.collection('Biblio').doc('VWf30cTxBYV5CidHmfKT').collection('Biblio').ref.get().then(data => {
      for(let list of data.docs){
        console.log('Biblio data : ', list.data());
        let biblio:Biblio = new Biblio();
        biblio.setBiblio(list.id, list.data().nomB, 0, null, list.data().maisonB);
        console.log(' maisonB : ', biblio.maisonB);
        if( biblio.maisonB.match(idM) === null){
          biblios.push(biblio);
          console.log("ajouté ! ");
        }
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
        maison.setMaison(list.id, list.data().nomM, "null", null);
        maisons.push(maison);
        console.log('Maison data bis : ', maison);
      }});

    return maisons;
  }

  retrieveLecteur() {
    let lecteurs : Lecteur[] = new Array();


    this.afs.collection('Lecteur').doc('e1IWZmEdiqjLeTv4xs0F').collection('Lecteur').ref.get().then(data => {
      for(let list of data.docs){
        console.log('Lecteur data : ', list.data());
        let lecteur:Lecteur = new Lecteur();
        lecteur.setLecteur(list.id, list.data().nom, list.data().prenom, list.data().pseudo, list.data().mdp, [], list.data().avatar);
        lecteurs.push(lecteur);
        console.log('Maison data bis : ', lecteur);
      }});

    return lecteurs;
  }

  rechercheLivre(){
    /*this.teamAdminCollection = fireStore.collection<any>('userProfile', ref =>
      ref.where('titre', '==', true));*/
  }

  changemenentBiblio(idL, idB){
    let livreRef = this.afs.collection('Livre').doc('Fa1vm1fYmsuKwCUuup31').collection('Livre').doc(idL);

    // Set le champs "biblioL" à l'id "idB"
    return livreRef.update({
      "biblioL": idB
    })
      .then(function() {
        console.log("Document successfully updated!");
      });
  }


}
