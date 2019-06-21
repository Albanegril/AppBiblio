import {Livre} from "./Livre";
import {Lecteur} from "./Lecteur";

export class Biblio {
  private _id_B: string;
  private _nom_B: string;
  private _nb_etages: number;
  private _proprio_B: Lecteur;
  private _maisonB: string;

  get id_B(): string {
    return this._id_B;
  }

  set id_B(value: string) {
    this._id_B = value;
  }

  get nom_B(): string {
    return this._nom_B;
  }

  set nom_B(value: string) {
    this._nom_B = value;
  }

  get nb_etages(): number {
    return this._nb_etages;
  }

  set nb_etages(value: number) {
    this._nb_etages = value;
  }

  get proprio_B(): Lecteur {
    return this._proprio_B;
  }

  set proprio_B(value: Lecteur) {
    this._proprio_B = value;
  }

  get maisonB(): string {
    return this._maisonB;
  }

  set maisonB(value: string) {
    this._maisonB = value;
  }

  setBiblio(id_B: string, nom_B: string, nb_etages: number, proprio_B: Lecteur, maisonB: string) {
    this._id_B = id_B;
    this._nom_B = nom_B;
    this._nb_etages = nb_etages;
    this._proprio_B = proprio_B;
    this._maisonB = maisonB;
  }
}
