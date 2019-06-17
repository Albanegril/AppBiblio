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
import {NgForm} from "@angular/forms";

/*
  Generated class for the LienFireBaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LienFireBaseProvider {

  constructor(public http: HttpClient,
             public afs: AngularFirestore
              ) {
    console.log('Hello LienFireBaseProvider Provider');
  }

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
        pseudo: form.value.pseudo,
        mail: form.value.mail,
        nom: form.value.nom,
        prenom: form.value.prenom,
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
      this.afs.collection('/Biblio/VWf30cTxBYV5CidHmfKT/Biblio').add({
        nomB: form.value.nomB,
        maisonB: form.value.maison,
        nbEtages: form.value.nbEtages,
        proprioB: form.value.proprio,
        livres: null,
      })
        .then(
          (res) => {
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

  addLecture(id: string, id_L: string, num_page: number, commentaire: string){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/Lecture/t6TbbwaGN5OXFY3cpWoo/Lecture').add({
        idLec: id,
        idLiv: id_L,
        page: num_page,
        commentaire: commentaire
      })
        .then(
          (res) => {
            resolve(res)
          },
          err => reject(err)
        )
    })
  }

    //TODO
    // utiliser la fct update plutot que set ?
/*    this.afs.collection('Maison').doc('bv394kJ4Bv6oJ0Dv0kWI').collection('Maison').doc(idM).update({
      "Biblio.[i]": idB
    })
      .then(function() {
        console.log("Document successfully updated!");
      });*/

  retrieveLivres() : Livre[]{
    let livres : Livre[] = [];

    this.afs.collection('Livre').doc('Fa1vm1fYmsuKwCUuup31').collection('Livre').ref.get().then(data => {
      for(let list of data.docs){
        let listData = list.data();
        console.log('Livre data : ', list.data());
        console.log('Livre nom : ', list.data().titre);
      }});

    return livres;
  }

  retrieveLivresDeB(idB: string) : Livre[]{
    let livres : Livre[] = [];
    console.log('IdB : ', idB);

    this.afs.collection('Livre').doc('Fa1vm1fYmsuKwCUuup31').collection('Livre').ref.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        let livre:Livre = new Livre();
        livre.setLivre(doc.id, doc.data().titre, "null", "null", doc.data().editeur, doc.data().langue,
          doc.data().date, "null", doc.data().nbPages, "null", doc.data().resume, doc.data().auteurs,
          [], "null", doc.data().cover, "null", doc.data().proprioL, [], doc.data().biblioL);
        if(livre.biblio_L === idB){
          livres.push(livre);
          console.log("ajouté !");
        }
        console.log('Livre data  : ', livre.titre);
      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });

    return livres;
  }

  retrieveBiblio() : Biblio[]{
    let biblios : Biblio[] = [];

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
    let biblios : Biblio[] = [];

    this.afs.collection('Biblio').doc('VWf30cTxBYV5CidHmfKT').collection('Biblio').ref.get().then(data => {
      console.log('toutes les biblios : ', data.docs);
      for(let list of data.docs){
        console.log('Biblio data : ', list.data());
        let biblio:Biblio = new Biblio();
        biblio.setBiblio(list.id, list.data().nomB, 0, null, list.data().maisonB);
        console.log(' maisonB : ', biblio.maisonB, ' idM : ', idM);
        if( biblio.maisonB === idM){
          biblios.push(biblio);
          console.log("ajouté ! ");
        }
        console.log('Biblio data bis : ', biblio);
      }});

    return biblios;
  }

  retrieveMaison() {
    let maisons : Maison[] = [];

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
    let lecteurs : Lecteur[] = [];

    this.afs.collection('Lecteur').doc('e1IWZmEdiqjLeTv4xs0F').collection('Lecteur').ref.get().then(data => {
      for(let list of data.docs){
        console.log('Lecteur data : ', list.data());
        let lecteur:Lecteur = new Lecteur();
        lecteur.setLecteur(list.id,  list.data().pseudo, list.data().mail, list.data().nom, list.data().prenom, list.data().mdp, [], list.data().avatar);
        lecteurs.push(lecteur);
        console.log('Lecteur data bis : ', lecteur);
      }});

    return lecteurs;
  }

  retrieveLecteurID(idL:string):Lecteur {
    let docRef = this.afs.collection('Lecteur').doc('e1IWZmEdiqjLeTv4xs0F').collection('Lecteur').doc(idL);
    let lecteur:Lecteur = new Lecteur();

    console.log('docRef : ', docRef);

    docRef.ref.get().then(function(doc) {
      console.log('doc : ', doc);
      if (doc.exists) {
        console.log("Document data:", doc.data());
        lecteur.setLecteur(doc.id,  doc.data().pseudo, doc.data().mail, doc.data().nom, doc.data().prenom, doc.data().mdp, [], doc.data().avatar);
        console.log("lecteur pseudo :", lecteur.pseudo);

      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
    return lecteur;
  }

  retrieveLectureLivDeLec(idLiv, idLec){
    let docRef = this.afs.collection('Lecture').doc('t6TbbwaGN5OXFY3cpWoo').collection('Lecture');
    let lecture:Lecture = new Lecture();

    docRef.ref.get().then(data => {
      console.log('toutes les lectures : ', data.docs);
      for(let list of data.docs){
        console.log('Lecture data : ', list.data());
        if( list.data().idLec === idLec){
          if(list.data().idLiv === idLiv){
            lecture.setLecture(list.id, list.data().idLec, list.data().idLiv, list.data().page, list.data().commentaire);
            console.log("Lecture trouvée ! ");
          }
        }
      }});

    return lecture;
  }

  retrieveLectureDeLec(idLec:string){
    let docRef = this.afs.collection('Lecture').doc('t6TbbwaGN5OXFY3cpWoo').collection('Lecture');
    let lecture:Lecture = new Lecture();
    let lectures: Lecture[] = [];

    docRef.ref.get().then(data => {
      console.log('toutes les lectures : ', data.docs);
      for(let list of data.docs){
        console.log('Lecture data : ', list.data());
        if( list.data().idLec === idLec){
          lecture.setLecture(list.id, list.data().idLec, list.data().idLiv, list.data().page, list.data().commentaire);
          lectures.push(lecture);
          console.log("Lecture ajoutée : ", lecture);
        }
      }});

    return lectures;
  }

  retrieveLecteurDeLivre(idLiv:string){
    let docRef = this.afs.collection('Lecture').doc('t6TbbwaGN5OXFY3cpWoo').collection('Lecture');
    let lecteur:Lecteur = new Lecteur();
    let lecteurs: Lecteur[] = [];

    docRef.ref.get().then(data => {
      console.log('toutes les lectures : ', data.docs);
      for(let list of data.docs){
        console.log('Lecture data : ', list.data());
        if( list.data().idLiv === idLiv){
          lecteur = this.retrieveLecteurID(list.data().idLec);
          lecteurs.push(lecteur);
          console.log("Lecteur ajouté : ", lecteur);
        }
      }});

    return lecteurs;
  }

  getLivre(idL) : Livre{
    let docRef = this.afs.collection('Livre').doc('Fa1vm1fYmsuKwCUuup31').collection('Livre').doc(idL);
    let livre :Livre = new Livre();

    console.log('idL : ', idL);
    console.log('livre : ', livre);

    docRef.ref.get().then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        console.log("Document titre :", doc.data().titre);


        let lecteur : Lecteur = new Lecteur();

        console.log('lecteur : ', lecteur);
        console.log(doc.data().proprioL);


/*                let proprio:string;
                proprio = doc.data().proprioL;
                console.log('proprio : ', proprio);

                lecteur = this.retrieveLecteurID(proprio);

                console.log('lecteur.pseudo : ', lecteur.pseudo);*/

        let listLectures: string[] = [];
/*        let lectures: Lecture[];
        lectures = this.retrieveLecteurDeLivre(doc.id);
        for(let lecture of lectures){
          if(lecture.idLec===doc.id){
            listLectures.push(lecture.idLec);
          }
        }*/

        livre.setLivre(doc.id, doc.data().titre, "null", "null", doc.data().editeur, doc.data().langue,
          doc.data().date, "null", doc.data().nbPages, "null", doc.data().resume, doc.data().auteurs,
          [], "null", doc.data().cover, "null", lecteur.pseudo, listLectures, doc.data().biblioL);
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

  rechercheLivre(){
    //TODO
    /*this.teamAdminCollection = fireStore.collection<any>('userProfile', ref =>
      ref.where('titre', '==', true));*/
  }

  changemenentBiblio(idL, idB){
    let livreRef = this.afs.collection('Livre').doc('Fa1vm1fYmsuKwCUuup31').collection('Livre').doc(idL);

    // Set le champs "biblioL" à l'idLec "idB"
    return livreRef.update({
      "biblioL": idB
    })
      .then(function() {
        console.log("Document successfully updated!");
      });
  }


  modifierLivre(form, id_L: string) {
    return new Promise<any>((resolve, reject) => {
      console.log(form.value);

      let livre: Livre = new Livre();
      livre = this.getLivre(id_L);
      let titre:string;
      if (typeof form.value.titre === "undefined") {titre = livre.titre;}
      else {titre = form.value.titre;}

      let editeur:string;
      if (typeof form.value.editeur === "undefined") {editeur = livre.editeur;}
      else {editeur = form.value.editeur;}

      let langue:string;
      if (typeof form.value.langue === "undefined") {langue = livre.langue;}
      else {langue = form.value.langue;}

      let date:string;
      if (typeof form.value.date === "undefined") {date = livre.date;}
      else {date = form.value.date;}

      let pages:number;
      if (typeof form.value.nbPages === "undefined") {pages = livre.nbPages;}
      else {pages = form.value.nbPages;}

      let resume:string;
      if (typeof form.value.resume === "undefined") {resume = livre.resume;}
      else {resume = form.value.resume;}

      let auteurs:string[];
      if (typeof form.value.auteurs === "undefined") {auteurs = livre.auteurs;}
      else {auteurs = form.value.auteurs;}

      let cover:string;
      if (typeof form.value.cover === "undefined") {cover = livre.cover;}
      else {cover = form.value.cover;}

      let proprio:string;
      if (typeof form.value.proprioL === "undefined") {proprio = livre.proprio_L;}
      else {proprio = form.value.proprioL;}

      let biblio:string;
      if (typeof form.value.biblioL === "undefined") {biblio = livre.biblio_L;}
      else {biblio = form.value.biblioL;}

      this.afs.collection('/Livre/Fa1vm1fYmsuKwCUuup31/Livre').doc(id_L).update(
        {
          titre: titre,
          //isbn: isbn,
          editeur: editeur,
          langue: langue,
          date: date,
          //edition: edition,
          nbPages: pages,
          resume: resume,
          auteurs: auteurs,
          cover: cover,
          proprioL: proprio,
          biblioL: biblio

        })
        .then(
          (res) => {
            console.log('livre modifier : ', id_L);
            resolve(res)
          },
          err => reject(err)
        )
    })
  }
}
