import {Biblio} from "./Biblio";
import {Lecteur} from "./Lecteur";

export class Maison {
  id_M: number;
  nom_M: string;
  adresse: string;
  proprio_M: Lecteur;
  biblios: Biblio[];


  constructor(id_M: number, nom_M: string, adresse: string, proprio_M: Lecteur, biblios: Biblio[]) {
    this.id_M = id_M;
    this.nom_M = nom_M;
    this.adresse = adresse;
    this.proprio_M = proprio_M;
    this.biblios = biblios;
  }


}
