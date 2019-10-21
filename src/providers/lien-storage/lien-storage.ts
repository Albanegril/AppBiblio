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
  public keys:String[] = [];

  constructor(public http: HttpClient,
              private storage: Storage) {
    console.log('Hello LienStorageProvider Provider');
  }

  getDriver(){
    return this.storage.driver;
  }

  /* KEYS */
  getAllKeys(){
    return new Promise<any>((resolve, reject) => {
      return this.storage.keys().then((val) => {
       // console.log("VAL : ", val);
        this.keys = val;
       // console.log('KEYS : ', this.keys);
        resolve(this.keys)
      }).catch((error) => {
        console.log("Error getting keys:", error);
      });
    });
  }

  getElementKeys(element:string){
    return new Promise<any>((resolve, reject) => {
      return this.getAllKeys().then((val) => {
        let elementKeys:String[] = [];
        //console.log("this.keys : ", this.keys);
        this.keys.forEach(function(key) {
          if(key.includes(element)){
            //console.log(key);
            elementKeys.push(key);
          }
        });
       // console.log("ELEMENT KEYS :", elementKeys);
        resolve(elementKeys);
      }).catch((error) => {
        console.log("Error getting Elements keys:", error);
      });
    });
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
          livre.setLivre(val._id_L, val._titre, val._isbn || "null", val._format || "null", val._editeur, val._langue,
            val._date, val._edition, val._nbPages, val._dimensions || "null", val._resume, val._auteurs,
            val._avis || [], val._type, val._cover, val._genre, val._proprioL, val._lecteurs || null, val._biblioL);
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
        let data = this.storage.set(`livre ${ livre.id_L }`, livre);
       // console.log("Livres : ", data);
      }
    });
  }

  getLivres(): Promise<Livre[]>{
    let self = this; //if not this is not defined
    return new Promise<Livre[]>((resolve, reject) => {
      let livres: Livre[] = [];
      this.getElementKeys('livre ').then((K) => {
        let listKeys = K;
        //console.log("LIST KEY : ", listKeys);
        listKeys.forEach(function(key) {
            self.storage.get(key).then((val) => {
              let livre: Livre = new Livre();
              livre.setLivre(val._id_L, val._titre, val._isbn || "null", val._format || "null", val._editeur, val._langue,
                val._date, val._edition, val._nbPages, val._dimensions || "null", val._resume, val._auteurs,
                val._avis || [], val._type, val._cover, val._genre, val._proprioL, val._lecteurs || null, val._biblioL);
              livres.push(livre);
            }).catch((error) => {
              console.log("Error getting document:", error);
            })
          });
        resolve(livres);
      }).catch((error) => {
        console.log("Error getting document:", error);
      })
    });
  }

  getLivresDeB(idB): Promise<Livre[]>{
    let self = this; //if not this is not defined
    return new Promise<Livre[]>((resolve, reject) => {
      let livres: Livre[] = [];
      this.getLivres().then((val) => {
        console.log("VAL livre : ", val);
        for(let liv of val){
          if(liv.biblio_L == idB) {
            /*
            let livre: Livre = new Livre();
            livre.setLivre(liv.id_L, liv.titre, liv.isbn || "null", liv.format || "null", liv.editeur, liv.langue,
              liv.date, liv.edition, liv.nbPages, liv.dimensions || "null", liv.resume, liv.auteurs,
              liv.avis || [], liv.type, liv.cover, liv.genre, liv.proprio_L, liv.lecteurs || null, liv.biblio_L);
             */
            livres.push(liv);
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
        biblio.setBiblio(val._id, val._nomB, val._nb_etages || 0, val._proprio_B || null, val._maisonB);
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
        let data = this.storage.set(`biblio ${ biblio.id_B }`, biblio);
       // console.log('Biblios : ', data);
      }
    });
  }

  getBiblios(): Promise<Biblio[]>{
    let self = this; //if not this is not defined
    return new Promise<Biblio[]>((resolve, reject) => {
      let biblios: Biblio[] = [];
      this.getElementKeys('biblio ').then((K) => {
        let listKeys = K;
        listKeys.forEach(function(key) {
          self.storage.get(key).then((val) => {
           // console.log("VAL biblio : ", val);
            let biblio: Biblio = new Biblio();
            biblio.setBiblio(val._id_B, val._nom_B, val._nb_etages || 0, val._proprio_B || null, val._maisonB);
            biblios.push(biblio);
          }).catch((error) => {
            console.log("Error getting document:", error);
          })
        });
        resolve(biblios);
      }).catch((error) => {
        console.log("Error getting document:", error);
      })
    });
  }

  getBiblioDeM(idM: string): Promise<Biblio[]> {
    return new Promise<Biblio[]>((resolve, reject) => {
      let biblios: Biblio[] = [];
      this.getBiblios().then((val) => {
        for(let bibli of val){
          if(bibli.maisonB === idM) {
            /*
            let biblio: Biblio = new Biblio();
            biblio.setBiblio(bibli.id_B, bibli.nom_B, bibli.nb_etages || 0, bibli.proprio_B || null, bibli.maisonB);
             */
            biblios.push(bibli);
          }
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });
      resolve(biblios);
    });
  }

  //TODO
  moveFromBiblio(idL, idB): Promise<any> {
    return new Promise<Biblio[]>((resolve, reject) => {
      return this.getBiblios().then((val) => {
        for(let bibli of val){
          if (bibli.id_B == idB){
            //TODO : update id_B de livre !
            // get + set ?
            console.log("not done yet")
          }
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
        let data = this.storage.set(`maison ${maison.id_M}`, maison);
        //console.log("Maisons : ", data);
      }
    });
  }

  getMaisons(): Promise<Maison[]>{
    let self = this; //if not this is not defined
    return new Promise<Maison[]>((resolve, reject) => {
      let maisons: Maison[] = [];
      this.getElementKeys('maison ').then((K) => {
        let listKeys = K;
        listKeys.forEach(function(key) {
          self.storage.get(key).then((val) => {
            let maison:Maison = new Maison();
            maison.setMaison(val._id_M, val._nom_M, val._adresse || "null", val._proprio_M || null);
            maisons.push(maison);
          }).catch((error) => {
            console.log("Error getting document:", error);
          })
        });
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
        let data = this.storage.set(`lecteur ${ lecteur.id }`, lecteur);
        //console.log("Lecteurs : ", data);
      }
    });
  }

  getLecteurs(): Promise<Lecteur[]>{
    let self = this; //if not this is not defined
    return new Promise<Lecteur[]>((resolve, reject) => {
        let lecteurs: Lecteur[] = [];
      this.getElementKeys('lecteur ').then((K) => {
        let listKeys = K;
        listKeys.forEach(function(key) {
          self.storage.get(key).then((val) => {
            console.log("VAL lecteur : ", val);
            let lecteur:Lecteur = new Lecteur();
            lecteur.setLecteur(val._id, val._pseudo, val._mail, val._nom, val._prenom,
              val._mdp, val._lecteurs || [], val._avatar);
            lecteurs.push(lecteur);
          }).catch((error) => {
            console.log("Error getting Lecteur:", error);
          })
        });
        resolve(lecteurs);
      }).catch((error) => {
        console.log("Error getting Keys:", error);
      })
    });
  }

  getLecteursDeLivre(idLiv: string) {
    let self = this; //if not this is not defined
    return new Promise<Lecteur[]>((resolve, reject) => {
      let lecteurs: Lecteur[] = [];
      this.getLectures().then(data => {
        let lecteurs: Lecteur[] = [];
        for (let lect of data) {
          let lecteur: Lecteur = new Lecteur();
          if (lect.idLiv === idLiv) {
            this.getLecteur(lect.idLec).then(val => {
              console.log("Lecteur data : ", val);
              lecteur = val;
            });
            lecteurs.push(lecteur);
          }
        }
        resolve(lecteurs);
      }).catch((error) => {
        console.log("Error getting Keys:", error);
      })
    });

    /* return new Promise<Lecteur[]>((resolve, reject) => {
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
    });*/
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
      return this.getLectures().then(data => {
        let lecture: Lecture = new Lecture();
        for (let lect of data) {
          if (lect.idLec === idLec) {
            if (lect.idLiv === idLiv) {
              console.log("LECT : ", lect);
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
      return this.getLectures().then(data => {
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
        let data = this.storage.set(`lecture ${ lecture.id }`, lecture);
        //console.log("Lectures : ", data);
      }
    });
  }

  getLectures(): Promise<Lecture[]>{
    let self = this; //if not this is not defined
    return new Promise<Lecture[]>((resolve, reject) => {
        let lectures: Lecture[] = [];
        this.getElementKeys('lecture ').then((K) => {
          let listKeys = K;
          listKeys.forEach(function (key) {
            self.storage.get(key).then((val) => {
              let lecture: Lecture = new Lecture();
              console.log("VAL lecture : ", val);
              lecture.setLecture(val._id, val._idLec, val._idLiv, val._page, val._commentaire, val._dateDebut, val._dateFin);
              lectures.push(lecture);
            }).catch((error) => {
              console.log("Error getting document:", error);
            })
          });
        resolve(lectures);
      }).catch((error) => {
        console.log("Error getting document:", error);
      })
    });
  }
}
