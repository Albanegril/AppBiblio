import {Biblio} from "./Biblio";
import {Lecteur} from "./Lecteur";

export class Maison {
  private _id_M: string;
  private _nom_M: string;
  private _adresse: string;
  private _proprio_M: Lecteur;
  expanded: boolean = false;

  get id_M(): string {
    return this._id_M;
  }

  set id_M(value: string) {
    this._id_M = value;
  }

  get nom_M(): string {
    return this._nom_M;
  }

  set nom_M(value: string) {
    this._nom_M = value;
  }

  get adresse(): string {
    return this._adresse;
  }

  set adresse(value: string) {
    this._adresse = value;
  }

  get proprio_M(): Lecteur {
    return this._proprio_M;
  }

  set proprio_M(value: Lecteur) {
    this._proprio_M = value;
  }

  setMaison(id_M: string, nom_M: string, adresse: string, proprio_M: Lecteur) {
    this._id_M = id_M;
    this._nom_M = nom_M;
    this._adresse = adresse;
    this._proprio_M = proprio_M;
  }
}
