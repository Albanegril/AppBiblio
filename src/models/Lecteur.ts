import {Lecture} from "./Lecture";

export class Lecteur {
  id: number;
  nom: string;
  prenom: string;
  pseudo: string;
  mdp: string; // à crypter !!
  lectures: Lecture[];

  constructor(id: number, nom: string, prenom: string, pseudo: string, mdp: string) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.pseudo = pseudo;
    this.mdp = mdp;
  }

  ajouterLecture(idL:number, num_page:number ){
    let lecture = new Lecture(this.id, idL, num_page);
    this.lectures.push(lecture);
  }

  majLecture(idL, page){
    //if(idL existe in lectures)
      //cettelecture.num_page = page;
    // else
      this.ajouterLecture(idL, page);
  }
}
