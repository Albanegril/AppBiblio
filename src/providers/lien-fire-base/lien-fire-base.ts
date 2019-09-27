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
              public afs: AngularFirestore) {
    console.log('Hello LienFireBaseProvider Provider');
  }

  addLivre(form): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      console.log(form.value);
      this.afs.collection('/Livre/Fa1vm1fYmsuKwCUuup31/Livre').add(
        {
          titre: form.value.titre,
          isbn: form.value.isbn || null,
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

  addLecteur(form): Promise<any> {
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

  addBiblio(form): Promise<any> {
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

  addMaison(nom, adresse, proprio): Promise<any> {
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

  addLecture(idLiv: string, idLec: string, num_page: number, commentaire: string, dateD: Date, dateF: Date): Promise<any> {
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

  retrieveLivres(): Promise<Livre[]> {
    return new Promise<Livre[]>((resolve, reject) => {
      return this.afs.collection('Livre').doc('Fa1vm1fYmsuKwCUuup31').collection('Livre').ref.get()
        .then(data => {
          let livres: Livre[] = [];
          for (let doc of data.docs) {
            let livre: Livre = new Livre();
            livre.setLivre(doc.id, doc.data().titre, doc.data().isbn || "null", doc.data().format || "null",
              doc.data().editeur, doc.data().langue, doc.data().date, doc.data().edition, doc.data().nbPages,
              doc.data().dimensions || "null", doc.data().resume, doc.data().auteurs, doc.data().avis || [],
              doc.data().type, doc.data().cover, doc.data().genre, doc.data().proprioL, doc.data().lecteurs || [], doc.data().biblioL);
            livres.push(livre);
          }
            resolve(livres);
        }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    });
  }

  retrieveLivresDeB(idB: string): Promise<Livre[]> {
    return new Promise<Livre[]>((resolve, reject) => {
      //TODO attention utilisation querySnapshot
      return this.afs.collection('Livre').doc('Fa1vm1fYmsuKwCUuup31').collection('Livre').ref.get()
        .then(function (querySnapshot) {
          let livres: Livre[] = [];
          querySnapshot.forEach(function (doc) { // doc.data() is never undefined for query doc snapshots
          let livre: Livre = new Livre();
          livre.setLivre(doc.id, doc.data().titre, doc.data().isbn || "null", doc.data().format || "null",
              doc.data().editeur, doc.data().langue, doc.data().date, doc.data().edition, doc.data().nbPages,
              doc.data().dimensions || "null", doc.data().resume, doc.data().auteurs, doc.data().avis || [],
              doc.data().type, doc.data().cover, doc.data().genre, doc.data().proprioL, doc.data().lecteurs || [], doc.data().biblioL);
          if (livre.biblio_L === idB) {
            livres.push(livre);
          }
        });
        resolve(livres);
      })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        }).catch(function (error) {
          console.log("Error getting document:", error);
        });
    });
  }

  retrieveBiblio(): Promise<Biblio[]> {
    return new Promise<Biblio[]>((resolve, reject) => {
      this.afs.collection('Biblio').doc('VWf30cTxBYV5CidHmfKT').collection('Biblio').ref.get().then(data => {
        let biblios: Biblio[] = [];
        for (let list of data.docs) {
          let biblio: Biblio = new Biblio();
          biblio.setBiblio(list.id, list.data().nomB, list.data().nb_etages || 0, list.data().proprio_B || null, list.data().maisonB);
          biblios.push(biblio);
        }
        resolve(biblios);
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    });
  }

  retrieveBiblioDeM(idM: string): Promise<Biblio[]> {
    return new Promise<Biblio[]>((resolve, reject) => {
      return this.afs.collection('Biblio').doc('VWf30cTxBYV5CidHmfKT').collection('Biblio').ref.get().then(data => {
        let biblios: Biblio[] = [];
        for (let list of data.docs) {
          if (list.data().maisonB === idM) {
            let biblio: Biblio = new Biblio();
            biblio.setBiblio(list.id, list.data().nomB, list.data().nb_etages || 0, list.data().proprio_B || null, list.data().maisonB);
            biblios.push(biblio);
          }
        }
        resolve(biblios);
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    });
  }

  retrieveMaisons(): Promise<Maison[]> {
    return new Promise<Maison[]>((resolve, reject) => {
      return this.afs.collection('Maison').doc('bv394kJ4Bv6oJ0Dv0kWI').collection('Maison').ref.get().then(data => {
        let maisons: Maison[] = [];
        for (let list of data.docs) {
          let maison: Maison = new Maison();
          maison.setMaison(list.id, list.data().nomM, list.data().adresse || "null", list.data().proprio_M || null);
          maisons.push(maison);
        }
        resolve(maisons);
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    });
  }

  retrieveLecteurs(): Promise<Lecteur[]> {
    return new Promise<Lecteur[]>((resolve, reject) => {
      return this.afs.collection('Lecteur').doc('e1IWZmEdiqjLeTv4xs0F').collection('Lecteur').ref.get()
        .then(data => {
          let lecteurs: Lecteur[] = [];
          for (let list of data.docs) {
          let lecteur: Lecteur = new Lecteur();
          lecteur.setLecteur(list.id, list.data().pseudo, list.data().mail, list.data().nom, list.data().prenom,
            list.data().mdp, list.data().lectures || [], list.data().avatar);
          lecteurs.push(lecteur);
        }
        resolve(lecteurs);
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    });
  }

  retrieveLecteurID(idL: string): Promise<Lecteur> {
    return new Promise<Lecteur>((resolve, reject) => {
      return this.afs.collection('Lecteur').doc('e1IWZmEdiqjLeTv4xs0F').collection('Lecteur').doc(idL).ref.get()
        .then(function (doc) {
          let lecteur: Lecteur = new Lecteur();
          if (doc.exists) {
            lecteur.setLecteur(doc.id, doc.data().pseudo, doc.data().mail, doc.data().nom, doc.data().prenom, doc.data().mdp,
              doc.data().lectures || [], doc.data().avatar);
            resolve(lecteur);
          } else {
            console.log("No such document!");
          }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    });

  }

  retrieveLectureLivDeLec(idLiv, idLec): Promise<Lecture> {
    return new Promise<Lecture>((resolve, reject) => {
      return this.afs.collection('Lecture').doc('t6TbbwaGN5OXFY3cpWoo').collection('Lecture').ref.get()
        .then(data => {
          let lecture: Lecture = new Lecture();
          for (let list of data.docs) {
            if (list.data().idLec === idLec) {
              if (list.data().idLiv === idLiv) {
                lecture.setLecture(list.id, list.data().idLec, list.data().idLiv, list.data().page, list.data().commentaire,
                  list.data().dateDebut, list.data().dateFin);
              }
            }
          }
          resolve(lecture);
        }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    });
  }

  retrieveLectureDeLec(idLec: string): Promise<Lecture[]> {
    return new Promise<Lecture[]>((resolve, reject) => {
      return this.afs.collection('Lecture').doc('t6TbbwaGN5OXFY3cpWoo').collection('Lecture').ref.get()
        .then(data => {
          let lectures: Lecture[] = [];
          for (let list of data.docs) {
            let lecture: Lecture = new Lecture();
            if (list.data().idLec === idLec) {
              lecture.setLecture(list.id, list.data().idLec, list.data().idLiv, list.data().page, list.data().commentaire,
                list.data().dateDebut, list.data().dateFin);
              lectures.push(lecture);
            }
          }
          resolve(lectures);
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    });
  }

  retrieveLectures(): Promise<Lecture[]> {
    return new Promise<Lecture[]>((resolve, reject) => {
      return this.afs.collection('Lecture').doc('t6TbbwaGN5OXFY3cpWoo').collection('Lecture').ref.get()
        .then(data => {
          let lectures: Lecture[] = [];
          for (let list of data.docs) {
            let lecture: Lecture = new Lecture();
            lecture.setLecture(list.id, list.data().idLec, list.data().idLiv, list.data().page, list.data().commentaire,
              list.data().dateDebut, list.data().dateFin);
            lectures.push(lecture);
          }
          resolve(lectures);
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    });
  }

  retrieveLecteursDeLivre(idLiv: string) {
    return new Promise<Lecteur[]>((resolve, reject) => {
      return this.afs.collection('Lecture').doc('t6TbbwaGN5OXFY3cpWoo').collection('Lecture').ref.get()
        .then(data => {
          let lecteurs: Lecteur[] = [];
          for (let list of data.docs) {
            let lecteur: Lecteur = new Lecteur();
            if (list.data().idLiv === idLiv) {
              this.retrieveLecteurID(list.data().idLec).then(data => {
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

  retrieveLivre(idL): Promise<Livre> {
    return new Promise<Livre>((resolve, reject) => {
      return this.afs.collection('Livre').doc('Fa1vm1fYmsuKwCUuup31').collection('Livre').doc(idL).ref.get()
        .then(function (doc) {
          let livre: Livre = new Livre();
          if (doc.exists) {
            livre.setLivre(doc.id, doc.data().titre, doc.data().isbn || "null", doc.data().format || "null",
              doc.data().editeur, doc.data().langue, doc.data().date, doc.data().edition, doc.data().nbPages,
              doc.data().dimensions || "null", doc.data().resume, doc.data().auteurs, doc.data().avis || [],
              doc.data().type, doc.data().cover, doc.data().genre, doc.data().proprioL, doc.data().lecteurs || [], doc.data().biblioL);
            resolve(livre);
          } else {
            console.log("No such document!");
          }
      }).catch((error) => {
        console.log("Error getting document:", error);
      })
    });
  }

  changemenentBiblio(idL, idB): Promise<any> {
    // Set le champs "biblioL" à l'idL "idB"
    return this.afs.collection('Livre').doc('Fa1vm1fYmsuKwCUuup31').collection('Livre').doc(idL).update({
      "biblioL": idB
    }).then(function () {
        console.log("Document successfully updated!");
      });
  }

  // TODO simplify ! after test
  modifierLivre(form, data, id_L: string) {
    return new Promise<any>((resolve, reject) => {
      console.log(form.value);

      let livre: Livre = new Livre();
      livre = data;
      let titre: string;
      if (typeof form.value.titre === "undefined" || form.value.title === null) {
        titre = livre.titre;
      } else {
        titre = form.value.titre;
      }

      let editeur: string;
      if (typeof form.value.editeur === "undefined" || form.value.editeur === null) {
        editeur = livre.editeur;
      } else {
        editeur = form.value.editeur;
      }

      let langue: string;
      if (typeof form.value.langue === "undefined" || form.value.langue === null) {
        langue = livre.langue;
      } else {
        langue = form.value.langue;
      }

      let date: string;
      if (typeof form.value.date === "undefined" || form.value.date === null) {
        date = livre.date;
      } else {
        date = form.value.date;
      }

      let edition: string;
      if (typeof form.value.edition === "undefined" || form.value.edition === null) {
        edition = livre.edition;
      } else {
        edition = form.value.edition;
      }

      let pages: number;
      if (typeof form.value.nbPages === "undefined" || form.value.nbPages === null) {
        pages = livre.nbPages;
      } else {
        pages = form.value.nbPages;
      }

      let genre: string;
      if (typeof form.value.genre === "undefined" || form.value.genre === null || form.value.genre === "") {
        genre = livre.genre;
      } else {
        genre = form.value.genre;
      }

      let type: string;
      if (typeof form.value.type === "undefined" || form.value.type === null || form.value.type === "") {
        type = livre.type;
      } else {
        type = form.value.type;
      }

      let resume: string;
      if (typeof form.value.resume === "undefined" || form.value.resume === null) {
        resume = livre.resume;
      } else {
        resume = form.value.resume;
      }

      let auteurs: string[];
      if (typeof form.value.auteurs === "undefined" || form.value.auteurs === null) {
        auteurs = livre.auteurs;
      } else {
        auteurs = form.value.auteurs;
      }

      let cover: string;
      if (typeof form.value.cover === "undefined" || form.value.cover === null) {
        cover = livre.cover;
      } else {
        cover = form.value.cover;
      }

      let proprio: string;
      if (typeof form.value.proprioL === "undefined" || form.value.proprioL === null || form.value.proprioL === "") {
        proprio = livre.proprio_L;
      } else {
        proprio = form.value.proprioL;
      }

      let biblio: string;
      if (typeof form.value.biblioL === "undefined" || form.value.biblioL === null || form.value.biblioL === "") {
        biblio = livre.biblio_L;
      } else {
        biblio = form.value.biblioL;
      }

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

  deleteLivre(idL: string): Promise<any> {
    return this.afs.collection('Livre').doc('Fa1vm1fYmsuKwCUuup31').collection('Livre').doc(idL).delete().then(function () {
      console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  }

}
