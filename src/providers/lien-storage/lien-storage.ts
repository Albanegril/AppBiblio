import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Livre} from "../../models/Livre";
import { Storage } from '@ionic/storage';
import {Lecture} from "../../models/Lecture";
import {Lecteur} from "../../models/Lecteur";
import {Biblio} from "../../models/Biblio";
import {Maison} from "../../models/Maison";
/*
  Generated class for the LienStorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LienStorageProvider {

  constructor(public http: HttpClient,
              private storage: Storage) {
    console.log('Hello LienStorageProvider Provider');
  }

  /*LIVRE*/
  setLivre(livre:Livre): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      return this.storage.set(`livre ${livre.id_L}`, livre).then(
        (res) => {
          resolve(res)
        },
        err => reject(err)
      );
    });
  }

  getLivre(id:string): Promise<Livre>{
    return new Promise<Livre>((resolve, reject) => {
        return this.storage.get('livre ' + id).then((val) => {
          let livre: Livre = new Livre();
          livre.setLivre(val._id_L, val._titre, val.isbn || "null", val.format || "null", val._editeur, val._langue,
            val._date, val._edition, val._nbPages, val.dimensions || "null", val._resume, val._auteurs,
            val.avis || [], val._type, val._cover, val._genre, val._proprioL, val.lecteurs || null, val._biblioL);
          resolve(livre);
        }).catch((error) => {
        console.log("Error getting document:", error);
      })
    });
  }

  removeLivre(id:string) {
    return new Promise<any>((resolve, reject) => {
      this.storage.remove(`livre ${id}`); // ('livre ' + id)
    });
  }

  //TODO : a tester
  editLivre(form, data, id_L: string) {
    return new Promise<any>((resolve, reject) => {
      console.log(form.value);
      let livre: Livre = new Livre();
      livre = data;

      livre.setLivre(id_L, form.value.titre || livre.titre, livre.isbn || "null", livre.format || "null",
        form.value.editeur || livre.editeur, form.value.langue || livre.langue,
        form.value.date || livre.date, form.value.edition || livre.edition,
        livre.nbPages || null, livre.dimensions || "null", form.value.resume || livre.resume,
        form.value.auteurs || livre.auteurs,livre.avis || [], form.value.type || livre.type,
        form.value.cover || livre.cover, form.value.genre || livre.genre, form.value.proprio || livre.proprio_L,
        livre.lecteurs || null, form.value.biblio || livre.biblio_L);
      // TODO : EST CE QU'IL EST REMPLACE ?????
      this.storage.set(`livre ${ livre.id_L }`, livre)
        .then(
          (res) => {
            console.log('livre modifier : ', id_L);
            resolve(res)
          },
          err => reject(err)
        )
    })
  }

  setLivres(livres:Livre[]){
    return new Promise<any>((resolve, reject) => {
      for(let livre of livres){
        let livreStored = this.storage.set(`livre ${ livre.id_L }`, livre);
      }
    });
  }

  getLivres(): Promise<Livre[]>{
    return new Promise<Livre[]>((resolve, reject) => {
      return this.storage.get('livre ' ).then((val) => {
        let livres: Livre[] = [];
        for (let liv of val) {
          let livre: Livre = new Livre();
          console.log('livre : ', val);
          livre.setLivre(liv._id_L, liv._titre, liv.isbn || "null", liv.format || "null", liv._editeur, liv._langue,
            liv._date, liv._edition, liv._nbPages, liv.dimensions || "null", liv._resume, liv._auteurs,
            liv.avis || [], liv._type, liv._cover, liv._genre, liv._proprioL, liv.lecteurs || null, liv._biblioL);
          livres.push(livre);
        }
        resolve(livres);
      }).catch((error) => {
        console.log("Error getting document:", error);
      })
    });
  }

  getLivresDeB(idB): Promise<Livre[]>{
    return new Promise<Livre[]>((resolve, reject) => {
      return this.storage.get('livre ' ).then((val) => {
        let livres: Livre[] = [];
        for (let liv of val) {
          if(liv._biblioL == idB){
            let livre: Livre = new Livre();
            console.log('livre : ', val);
            livre.setLivre(liv._id_L, liv._titre, liv.isbn || "null", liv.format || "null", liv._editeur, liv._langue,
              liv._date, liv._edition, liv._nbPages, liv.dimensions || "null", liv._resume, liv._auteurs,
              liv.avis || [], liv._type, liv._cover, liv._genre, liv._proprioL, liv.lecteurs || null, liv._biblioL);
            livres.push(livre);
          }
        }
        resolve(livres);
      }).catch((error) => {
        console.log("Error getting document:", error);
      })
    });
  }

  /*BIBLIO*/
  setBiblio(biblio:Biblio): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      return this.storage.set(`biblio ${biblio.id_B}`, biblio).then(
        (res) => {
          resolve(res)
        },
        err => reject(err)
      );
    });
  }

  getBiblio(id:string): Promise<Biblio>{
    return new Promise<Biblio>((resolve, reject) => {
      let biblio: Biblio = new Biblio();
      let idStored = 'biblio ' + id;
      return this.storage.get(idStored).then((val) => {
        biblio.setBiblio(val.id, val.nomB, val.nb_etages || 0, val.proprio_B || null, val.maisonB);
        resolve(biblio);
      }).catch((error) => {
        console.log("Error getting document:", error);
      })
    });
  }

  removeBiblio(id:string) {
    return new Promise<any>((resolve, reject) => {
      this.storage.remove(`biblio ${id}`);
    });
  }

  setBiblios(biblios:Biblio[]){
    return new Promise<any>((resolve, reject) => {
      for(let biblio of biblios){
        this.storage.set(`biblio ${ biblio.id_B }`, biblio);
      }
    });
  }

  getBiblios(): Promise<Biblio[]>{
    return new Promise<Biblio[]>((resolve, reject) => {
      return this.storage.get('biblio ' ).then((val) => {
        let biblios: Biblio[] = [];
        for (let bib of val) {
          let biblio: Biblio = new Biblio();
          biblio.setBiblio(bib.id, bib.nomB, bib.nb_etages || 0, bib.proprio_B || null, bib.maisonB);
          biblios.push(biblio);
        }
        resolve(biblios);
      }).catch((error) => {
        console.log("Error getting document:", error);
      })
    });
  }

  getBiblioDeM(idM: string): Promise<Biblio[]> {
    return new Promise<Biblio[]>((resolve, reject) => {
      return this.storage.get('biblio ' ).then((val) => {
        let biblios: Biblio[] = [];
        for (let bib of val) {
          if(bib.maisonB === idM){
            let biblio: Biblio = new Biblio();
            biblio.setBiblio(bib.id, bib.nomB, bib.nb_etages || 0, bib.proprio_B || null, bib.maisonB);
            biblios.push(biblio);
          }
        }
        resolve(biblios);
      }).catch((error) => {
        console.log("Error getting document:", error);
      })
    });
  }

  //TODO
  moveFromBiblio(idL, idB): Promise<any> {
    return new Promise<Biblio[]>((resolve, reject) => {
      return this.storage.get('biblio ' ).then((val) => {
        if (val.id == idB){
          //TODO : update id_B de livre !
          // get + set ?
          console.log("not done yet")
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      })
    });
  }

  /*MAISON*/
  setMaison(maison:Maison): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      return this.storage.set(`maison ${maison.id_M}`, maison).then(
        (res) => {
          resolve(res)
        },
        err => reject(err)
      );
    });
  }

  getMaison(id:string): Promise<Maison>{
    return new Promise<Maison>((resolve, reject) => {
      return this.storage.get('maison ' + id).then((val) => {
        let maison: Maison = new Maison();
        maison.setMaison(val.id, val.nomM, val.adresse || "null", val.proprio_M || null);
        resolve(maison);
      }).catch((error) => {
        console.log("Error getting document:", error);
      })
    });
  }

  removeMaison(id:string) {
    return new Promise<any>((resolve, reject) => {
      this.storage.remove(`maison ${id}`);
    });
  }

  setMaisons(maisons:Maison[]){
    return new Promise<any>((resolve, reject) => {
      for(let maison of maisons){
        this.storage.set(`maison ${ maison.id_M }`, maison);
      }
    });
  }

  getMaisons(): Promise<Maison[]>{
    return new Promise<Maison[]>((resolve, reject) => {
      return this.storage.get('maison ' ).then((val) => {
        let maisons: Maison[] = [];
        for (let mai of val) {
          let maison:Maison = new Maison();
          maison.setMaison(mai.id, mai.nomM, mai.adresse || "null", mai.proprio_M || null);
          maisons.push(maison);
        }
        resolve(maisons);
      }).catch((error) => {
        console.log("Error getting document:", error);
      })
    });
  }

  /*LECTEURS*/
  setLecteur(lecteur:Lecteur): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      return this.storage.set(`lecteur ${lecteur.id}`, lecteur).then(
        (res) => {
          resolve(res)
        },
        err => reject(err)
      );
    });
  }

  getLecteur(id:string): Promise<Lecteur>{
    return new Promise<Lecteur>((resolve, reject) => {
      let lecteur: Lecteur = new Lecteur();
      let idStored = 'lecteur ' + id;
      return this.storage.get(idStored).then((val) => {
        lecteur.setLecteur(val.id, val.pseudo, val.mail, val.nom, val.prenom,
          val.mdp, val.lecteurs || [], val.avatar);
        resolve(lecteur);
      }).catch((error) => {
        console.log("Error getting document:", error);
      })
    });
  }

  removeLecteur(id:string) {
    return new Promise<any>((resolve, reject) => {
      this.storage.remove(`lecteur ${id}`);
    });
  }

  setLecteurs(lecteurs:Lecteur[]){
    return new Promise<any>((resolve, reject) => {
      for(let lecteur of lecteurs){
        this.storage.set(`lecteur ${ lecteur.id }`, lecteur);
      }
    });
  }

  getLecteurs(): Promise<Lecteur[]>{
    return new Promise<Lecteur[]>((resolve, reject) => {
      return this.storage.get('lecteur ' ).then((val) => {
        let lecteurs: Lecteur[] = [];
        for (let lec of val) {
          let lecteur:Lecteur = new Lecteur();
          lecteur.setLecteur(lec.id, lec.pseudo, lec.mail, lec.nom, lec.prenom,
            lec.mdp, lec.lecteurs || [], lec.avatar);
          lecteurs.push(lecteur);
        }
        resolve(lecteurs);
      }).catch((error) => {
        console.log("Error getting document:", error);
      })
    });
  }

  getLecteursDeLivre(idLiv: string) {
    return new Promise<Lecteur[]>((resolve, reject) => {
      return this.storage.get('lecture ' ).then(data => {
        let lecteurs: Lecteur[] = [];
        for (let lect of data) {
          let lecteur: Lecteur = new Lecteur();
          if (lect.idLiv === idLiv) {
            this.getLecteur(lect.idLec).then(data => {
              lecteur = data;
            });
            lecteurs.push(lecteur);
          }
        }
        resolve(lecteurs);
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    });
  }

  /*LECTURES*/
  setLecture(lecture:Lecture): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      return this.storage.set(`lecture ${lecture.id}`, lecture).then(
        (res) => {
          resolve(res)
        },
        err => reject(err)
      );
    });
  }

  getLecture(id:string): Promise<Lecture>{
    return new Promise<Lecture>((resolve, reject) => {
      return this.storage.get('lecture ' + id).then((val) => {
        let lecture: Lecture = new Lecture();
        lecture.setLecture(val.id, val.idLec, val.idLiv, val.page, val.commentaire, val.dateDebut, val.dateFin);
        resolve(lecture);
      }).catch((error) => {
        console.log("Error getting document:", error);
      })
    });
  }

  getLectureLivDeLec(idLiv, idLec): Promise<Lecture>{
    return new Promise<Lecture>((resolve, reject) => {
      return this.storage.get('lecture ' ).then(data => {
        let lecture: Lecture = new Lecture();
        for (let lect of data) {
          if (lect.idLec === idLec) {
            if (lect.idLiv === idLiv) {
              lecture.setLecture(lect.id, lect.idLec, lect.idLiv, lect.page, lect.commentaire, lect.dateDebut, lect.dateFin);
            }
          }
          resolve(lecture);
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    });
  }

  getLectureDeLec(idLec: string): Promise<Lecture[]> {
    return new Promise<Lecture[]>((resolve, reject) => {
      return this.storage.get('lecture ' ).then(data => {
        let lectures: Lecture[] = [];
        for (let lect of data) {
          let lecture: Lecture = new Lecture();
          if (lect.idLec === idLec) {
            lecture.setLecture(lect.id, lect.idLec, lect.idLiv, lect.page, lect.commentaire, lect.dateDebut, lect.dateFin);
            lectures.push(lecture);
          }
          resolve(lectures);
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    });
  }

  removeLecture(id:string) {
    return new Promise<any>((resolve, reject) => {
      this.storage.remove(`lecture ${id}`);
    });
  }

  setLectures(lectures:Lecture[]){
    return new Promise<any>((resolve, reject) => {
      for(let lecture of lectures){
        this.storage.set(`lecture ${ lecture.id }`, lecture);
      }
    });
  }

  getLectures(): Promise<Lecture[]>{
    return new Promise<Lecture[]>((resolve, reject) => {
      return this.storage.get('lecture ' ).then((val) => {
        let lectures: Lecture[] = [];
        for (let lect of val) {
          let lecture:Lecture = new Lecture();
          lecture.setLecture(lect.id, lect.idLec, lect.idLiv, lect.page, lect.commentaire, lect.dateDebut, lect.dateFin);
          lectures.push(lecture);
        }
        resolve(lectures);
      }).catch((error) => {
        console.log("Error getting document:", error);
      })
    });
  }
}
