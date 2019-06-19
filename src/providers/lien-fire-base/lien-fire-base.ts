import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Livre} from "../../models/Livre";

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import {Lecture} from "../../models/Lecture";
import {Lecteur} from "../../models/Lecteur";
import {Biblio} from "../../models/Biblio";
import {Maison} from "../../models/Maison";

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

  addLivre(form) : Promise<any> {
    return new Promise<any>((resolve, reject) => {
      console.log(form.value);
      this.afs.collection('/Livre/Fa1vm1fYmsuKwCUuup31/Livre').add(
      {
        titre: form.value.titre,
        //isbn: form.value.isbn,
        editeur: form.value.editeur,
        langue: form.value.langue,
        date: form.value.date,
        edition: form.value.edition,
        genre: form.value.genre,
        type: form.value.type,
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

  addLecteur(form) : Promise<any> {
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

  addBiblio(form) : Promise<any> {
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

  addMaison(nom, adresse, proprio) : Promise<any> {
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

  addLecture(idLec: string, idLiv: string, num_page: number, commentaire: string, dateD: Date, dateF: Date) : Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/Lecture/t6TbbwaGN5OXFY3cpWoo/Lecture').add({
        idLec: idLec,
        idLiv: idLiv,
        page: num_page,
        commentaire: commentaire,
        dateDebut: dateD,
        dateFin: dateF
      })
        .then(
          (res) => {
            resolve(res)
          },
          err => reject(err)
        )
    })
  }

  retrieveLivres() : Promise<Livre[]>{
    return new Promise<Livre[]>((resolve, reject) => {
      let livres : Livre[] = [];

      return this.afs.collection('Livre').doc('Fa1vm1fYmsuKwCUuup31').collection('Livre').ref.get().
      then(data => {
        for(let doc of data.docs){
          console.log('Livre data : ', doc.data());
          let livre:Livre = new Livre();
          livre.setLivre(doc.id, doc.data().titre, "null", "null", doc.data().editeur, doc.data().langue,
            doc.data().date, doc.data().edition, doc.data().nbPages, "null", doc.data().resume, doc.data().auteurs,
            [], doc.data().type, doc.data().cover, doc.data().genre, doc.data().proprioL, [], doc.data().biblioL);
          livres.push(livre);
          resolve(livres);
        }}).catch(function (error) {
        console.log("Error getting document:", error);
      });
    });
  }

  retrieveLivresDeB(idB: string) : Promise<Livre[]>{
    return new Promise<Livre[]>((resolve, reject) => {
      let livres : Livre[] = [];
      console.log('IdB : ', idB);

      //TODO attention utilisation querySnapshot
      return this.afs.collection('Livre').doc('Fa1vm1fYmsuKwCUuup31').collection('Livre').ref.get().
      then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          let livre:Livre = new Livre();
          livre.setLivre(doc.id, doc.data().titre, "null", "null", doc.data().editeur, doc.data().langue,
            doc.data().date, doc.data().edition, doc.data().nbPages, "null", doc.data().resume, doc.data().auteurs,
            [], doc.data().type, doc.data().cover, doc.data().genre, doc.data().proprioL, [], doc.data().biblioL);
          if(livre.biblio_L === idB){
            livres.push(livre);
            console.log("ajouté !");
          }
          console.log('Livre data  : ', livre.titre);
        });
        resolve(livres);
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    });
  }

  retrieveBiblio() : Promise<Biblio[]>{
    return new Promise<Biblio[]>((resolve, reject) => {
      let biblios : Biblio[] = [];

      this.afs.collection('Biblio').doc('VWf30cTxBYV5CidHmfKT').collection('Biblio').ref.get().
      then(data => {
        for(let list of data.docs){
          console.log('Biblio data : ', list.data());
          let biblio:Biblio = new Biblio();
          biblio.setBiblio(list.id, list.data().nomB, 0, null, list.data().maisonB);
          biblios.push(biblio);
          //console.log('Biblio data bis : ', biblio);
          resolve(biblios);
        }}).catch(function (error) {
        console.log("Error getting document:", error);
      });
    });
  }

  retrieveBiblioDeM(idM:string) : Promise<Biblio[]>{
    return new Promise<Biblio[]>((resolve, reject) => {
      // get info maison idM
      // foreach champs Biblio de maison idM
      // add dans list biblio idB
      // foreach biblio idB recupérer info + push dans list
      let biblios : Biblio[] = [];

      return this.afs.collection('Biblio').doc('VWf30cTxBYV5CidHmfKT').collection('Biblio').ref.get().
      then(data => {
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
          resolve(biblios);
        }}).catch(function (error) {
        console.log("Error getting document:", error);
      });
    });
  }

  retrieveMaison() : Promise<Maison[]> {
    return new Promise<Maison[]>((resolve, reject) => {
      let maisons : Maison[] = [];

      return this.afs.collection('Maison').doc('bv394kJ4Bv6oJ0Dv0kWI').collection('Maison').ref.get().
      then(data => {
        for(let list of data.docs){
          console.log('Maison data : ', list.data());
          let maison:Maison = new Maison();
          maison.setMaison(list.id, list.data().nomM, "null", null);
          maisons.push(maison);
          console.log('Maison data bis : ', maison);
          resolve(maisons);
        }}).catch(function (error) {
        console.log("Error getting document:", error);
      });
    });
  }

  retrieveLecteur() : Promise<Lecteur[]>{
    return new Promise<Lecteur[]>((resolve, reject) => {
      let lecteurs : Lecteur[] = [];

      return this.afs.collection('Lecteur').doc('e1IWZmEdiqjLeTv4xs0F').collection('Lecteur').ref.get().
      then(data => {
        for(let list of data.docs){
          console.log('Lecteur data : ', list.data());
          let lecteur:Lecteur = new Lecteur();
          lecteur.setLecteur(list.id,  list.data().pseudo, list.data().mail, list.data().nom, list.data().prenom,
            list.data().mdp, [], list.data().avatar);
          lecteurs.push(lecteur);
          console.log('Lecteur data bis : ', lecteur);
        }
        resolve(lecteurs);
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    });
}

  retrieveLecteurID(idL:string):Promise<Lecteur> {
    return new Promise<Lecteur>((resolve, reject) => {
      let docRef = this.afs.collection('Lecteur').doc('e1IWZmEdiqjLeTv4xs0F').collection('Lecteur').doc(idL);
      let lecteur: Lecteur = new Lecteur();

      console.log('docRef : ', docRef);

      return docRef.ref.get().then(function (doc) {
        console.log('doc : ', doc);
        if (doc.exists) {
          console.log("Document data:", doc.data());
          lecteur.setLecteur(doc.id, doc.data().pseudo, doc.data().mail, doc.data().nom, doc.data().prenom, doc.data().mdp,
            [], doc.data().avatar);
          console.log("lecteur pseudo :", lecteur.pseudo);
          resolve(lecteur);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    });

  }

  retrieveLectureLivDeLec(idLiv, idLec): Promise<Lecture>{
    return new Promise<Lecture>((resolve, reject) => {
      let docRef = this.afs.collection('Lecture').doc('t6TbbwaGN5OXFY3cpWoo').collection('Lecture');
      let lecture: Lecture = new Lecture();

      return docRef.ref.get().then(data => {
        console.log('toutes les lectures : ', data.docs);
        for (let list of data.docs) {
          console.log('Lecture data : ', list.data());
          if (list.data().idLec === idLec) {
            if (list.data().idLiv === idLiv) {
              lecture.setLecture(list.id, list.data().idLec, list.data().idLiv, list.data().page, list.data().commentaire, list.data().dateDebut, list.data().dateFin);
              console.log("Lecture trouvée ! ");
            }
          }
          resolve(lecture);
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    });

  }

  retrieveLectureDeLec(idLec:string) : Promise<Lecture[]>{
    return new Promise<Lecture[]>((resolve, reject) => {
      let docRef = this.afs.collection('Lecture').doc('t6TbbwaGN5OXFY3cpWoo').collection('Lecture');
      let lecture:Lecture = new Lecture();
      let lectures: Lecture[] = [];

      docRef.ref.get().then(data => {
        console.log('toutes les lectures : ', data.docs);
        for(let list of data.docs){
          console.log('Lecture data : ', list.data());
          if( list.data().idLec === idLec){
            lecture.setLecture(list.id, list.data().idLec, list.data().idLiv, list.data().page, list.data().commentaire, list.data().dateDebut, list.data().dateFin);
            lectures.push(lecture);
            console.log("Lecture ajoutée : ", lecture);
          }
          resolve(lectures);
        }}).catch(function (error) {
        console.log("Error getting document:", error);
      });
    });
  }

  retrieveLecteurDeLivre(idLiv:string){
    return new Promise<Lecteur[]>((resolve, reject) => {
      let docRef = this.afs.collection('Lecture').doc('t6TbbwaGN5OXFY3cpWoo').collection('Lecture');
      let lecteur:Lecteur = new Lecteur();
      let lecteurs: Lecteur[] = [];
      return docRef.ref.get().then(data => {
        console.log('toutes les lectures : ', data.docs);
        for(let list of data.docs){
          console.log('Lecture data : ', list.data());
          if( list.data().idLiv === idLiv){
            this.retrieveLecteurID(list.data().idLec).then(data => {
              lecteur = data;
            });
            lecteurs.push(lecteur);
            console.log("Lecteur ajouté : ", lecteur);
          }
        }
        resolve(lecteurs);
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    });
  }

  getLivre(idL) : Promise<Livre>{

    return new Promise<Livre>((resolve, reject) => {

      let docRef = this.afs.collection('Livre').doc('Fa1vm1fYmsuKwCUuup31').collection('Livre').doc(idL);
      let livre: Livre = new Livre();

      console.log('idL : ', idL);
      console.log('livre : ', livre);

      return docRef.ref.get().then(function (doc) {
         if (doc.exists) {
           console.log("Doc data:", doc.data());

           let lecteur: Lecteur = new Lecteur();
           /*     let proprio: string;
                proprio = doc.data().proprioL;
                console.log("Document proprio : ", doc.data().proprioL, " proprio : ", proprio);
                console.log("Document biblio : ", doc.data().biblioL);

                lecteur.pseudo = proprio;

             // TODO error pourquoi ?! impossible d'appeller une fct propre dans le provider ?

              if (typeof doc.data().proprioL === "undefined" || doc.data().proprioL === null )
               {
                 lecteur.pseudo = proprio;
               } else {
                 lecteur = this.retrieveLecteurID(proprio);
                  console.log('proprio : ', proprio);
                }
                console.log('lecteur.pseudo : ', lecteur.pseudo);

                let listLecteurs: string[] = [];
                   let lectures: Lecture[];
                    lectures = this.retrieveLecteurDeLivre(doc.id);
                    for(let lecture of lectures){
                      if(lecture.idLec===doc.id){
                        listLectures.push(lecture.idLec);
                      }
                    }

                   */

           livre.setLivre(doc.id, doc.data().titre, "null", "null", doc.data().editeur, doc.data().langue,
             doc.data().date, doc.data().edition, doc.data().nbPages, "null", doc.data().resume, doc.data().auteurs,
             [], doc.data().type, doc.data().cover, doc.data().genre, lecteur.pseudo, null, doc.data().biblioL);
           console.log("livre titre :", livre.titre);
           resolve(livre);

        } else {
           // doc.data() will be undefined in this case
           console.log("No such document!");
         }
       }).catch( (error) =>{console.log("Error getting document:", error);})
    });

  }

  changemenentBiblio(idL, idB) : Promise<any>{
    let livreRef = this.afs.collection('Livre').doc('Fa1vm1fYmsuKwCUuup31').collection('Livre').doc(idL);

    // Set le champs "biblioL" à l'idL "idB"
    return livreRef.update({
      "biblioL": idB
    })
      .then(function() {
        console.log("Document successfully updated!");
      });
  }


  modifierLivre(form, data, id_L: string) {
    return new Promise<any>((resolve, reject) => {
      console.log(form.value);

      let livre: Livre = new Livre();
      livre = data;
      let titre:string;
      if (typeof form.value.titre === "undefined" || form.value.title === null) {titre = livre.titre;}
      else {titre = form.value.titre;}

      let editeur:string;
      if (typeof form.value.editeur === "undefined" || form.value.editeur === null) {editeur = livre.editeur;}
      else {editeur = form.value.editeur;}

      let langue:string;
      if (typeof form.value.langue === "undefined" || form.value.langue === null) {langue = livre.langue;}
      else {langue = form.value.langue;}

      let date:string;
      if (typeof form.value.date === "undefined" || form.value.date === null) {date = livre.date;}
      else {date = form.value.date;}

      let edition:string;
      if (typeof form.value.edition === "undefined" || form.value.edition === null) {edition = livre.edition;}
      else {edition = form.value.edition;}

      let pages:number;
      if (typeof form.value.nbPages === "undefined" || form.value.nbPages === null) {pages = livre.nbPages;}
      else {pages = form.value.nbPages;}

      let genre:string;
      if (typeof form.value.genre === "undefined" || form.value.genre === null || form.value.genre === "") {genre = livre.genre;}
      else {genre = form.value.genre;}

      let type:string;
      if (typeof form.value.type === "undefined" || form.value.type === null || form.value.type === "") {type = livre.type;}
      else {type = form.value.type;}

      let resume:string;
      if (typeof form.value.resume === "undefined" || form.value.resume === null) {resume = livre.resume;}
      else {resume = form.value.resume;}

      let auteurs:string[];
      if (typeof form.value.auteurs === "undefined" || form.value.auteurs === null) {auteurs = livre.auteurs;}
      else {auteurs = form.value.auteurs;}

      let cover:string;
      if (typeof form.value.cover === "undefined" || form.value.cover === null) {cover = livre.cover;}
      else {cover = form.value.cover;}

      let proprio:string;
      if (typeof form.value.proprioL === "undefined" || form.value.proprioL === null || form.value.proprioL === "")
      {proprio = livre.proprio_L;}
      else {proprio = form.value.proprioL;}

      let biblio:string;
      if (typeof form.value.biblioL === "undefined" || form.value.biblioL === null || form.value.biblioL === "")
      {biblio = livre.biblio_L;}
      else {biblio = form.value.biblioL;}

      this.afs.collection('/Livre/Fa1vm1fYmsuKwCUuup31/Livre').doc(id_L).update(
        {
          titre: titre,
          //isbn: isbn,
          editeur: editeur,
          langue: langue,
          date: date,
          edition: edition,
          genre: genre,
          type: type,
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

  deleteLivre(idL:string): Promise<any>{
    let livreRef = this.afs.collection('Livre').doc('Fa1vm1fYmsuKwCUuup31').collection('Livre').doc(idL);

    return livreRef.delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  }
}
