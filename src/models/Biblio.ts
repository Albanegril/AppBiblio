import {Livre} from "./Livre";
import {Lecteur} from "./Lecteur";

export class Biblio {
  id_B: number;
  nom_B: string;
  nb_etages: number;
  proprio_B: Lecteur;
  livres: Livre[];

  constructor(id_B: number, nom_B: string, nb_etages: number, proprio_B: Lecteur, livres: Livre[]) {
    this.id_B = id_B;
    this.nom_B = nom_B;
    this.nb_etages = nb_etages;
    this.proprio_B = proprio_B;
    this.livres = livres;
  }
}
