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

  retrieveLivres(){
    this.data = this.afs.collection<Livre>('/Livre/Fa1vm1fYmsuKwCUuup31/Livre').ref.get().then(data => {
      let i:number = 0;
      for(let list of data.docs){
        let listData = list.data();
       // console.log('Retreive data : ', list.data[i].doc.titre);
        console.log('Retreive data bis : ', list.data[i]);
        i++;
      }});

/*    this.livreCollection = this.afs.collection<Livre>('/Livre/Fa1vm1fYmsuKwCUuup31/Livre');
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
     this.livreCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Livre;
        const id = a.payload.doc.id;
        console.log('Retreive data : ' + data);
        console.log('Retreive id : ' + id);

        return { id, ...data };
      }))
    );*/
  }

  retrieveBiblio(){
    /*    let user_data= [];

    this.afs.database().ref().on('value', (snapshot) => {
        let result = snapshot.value();
        for(let k in result){ //"k" provides key Id of each object
          user_data.push({
            id : k,
            name : result[k].name,
            phone : result[k].phone,
          });
        }
      });*/
  }

  rechercheLivre(){
    /*this.teamAdminCollection = fireStore.collection<any>('userProfile', ref =>
      ref.where('teamAdmin', '==', true));*/
  }


}
