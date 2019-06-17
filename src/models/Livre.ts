import {Lecteur} from "./Lecteur";

export class Livre {
  private _id_L: string = null;

  private _titre: string = null;
  private _isbn: string = null;
  private _format: string = null;
  private _editeur: string = null;
  private _langue: string = null;
  private _date: string = null;
  private _edition: string = null;
  private _nbPages: number = null;
  private _dimensions: string = null;
  private _resume: string = null;
  private _auteurs: string[] = null;
  private _avis: string[] = null;
  private _type: string = null; // documentaire, roman, album...
  private _cover: string = null; //URL ? ou BD ?
  private _genre: string = null; //Genre[] ? // type enum ?

  private _proprio_L: string = null; //ID lecteur
  private _lecteurs: string[] = null; // ID lecteurs
  private _biblio_L: string = null; // ID biblio


  get id_L(): string {
    return this._id_L;
  }

  set id_L(value: string) {
    this._id_L = value;
  }

  get titre(): string {
    return this._titre;
  }

  set titre(value: string) {
    this._titre = value;
  }

  get isbn(): string {
    return this._isbn;
  }

  set isbn(value: string) {
    this._isbn = value;
  }

  get format(): string {
    return this._format;
  }

  set format(value: string) {
    this._format = value;
  }

  get editeur(): string {
    return this._editeur;
  }

  set editeur(value: string) {
    this._editeur = value;
  }

  get langue(): string {
    return this._langue;
  }

  set langue(value: string) {
    this._langue = value;
  }

  get date(): string {
    return this._date;
  }

  set date(value: string) {
    this._date = value;
  }

  get edition(): string {
    return this._edition;
  }

  set edition(value: string) {
    this._edition = value;
  }

  get nbPages(): number {
    return this._nbPages;
  }

  set nbPages(value: number) {
    this._nbPages = value;
  }

  get dimensions(): string {
    return this._dimensions;
  }

  set dimensions(value: string) {
    this._dimensions = value;
  }

  get resume(): string {
    return this._resume;
  }

  set resume(value: string) {
    this._resume = value;
  }

  get auteurs(): string[] {
    return this._auteurs;
  }

  set auteurs(value: string[]) {
    this._auteurs = value;
  }

  get avis(): string[] {
    return this._avis;
  }

  set avis(value: string[]) {
    this._avis = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get cover(): string {
    return this._cover;
  }

  set cover(value: string) {
    this._cover = value;
  }

  get genre(): string {
    return this._genre;
  }

  set genre(value: string) {
    this._genre = value;
  }

  get proprio_L(): string {
    return this._proprio_L;
  }

  set proprio_L(value: string) {
    this._proprio_L = value;
  }

  get lecteurs(): string[] {
    return this._lecteurs;
  }

  set lecteurs(value: string[]) {
    this._lecteurs = value;
  }

  get biblio_L(): string {
    return this._biblio_L;
  }

  set biblio_L(value: string) {
    this._biblio_L = value;
  }

  setLivre(id_L: string, titre: string, isbn: string, format: string, editeur: string, langue: string, date: string, edition: string, nbPages: number, dimensions: string, resume: string, auteurs: string[], avis: string[], type: string, cover: string, genre: string, proprio_L: string, lecteurs: string[], biblio_L: string) {
    this._id_L = id_L;
    this._titre = titre;
    this._isbn = isbn;
    this._format = format;
    this._editeur = editeur;
    this._langue = langue;
    this._date = date;
    this._edition = edition;
    this._nbPages = nbPages;
    this._dimensions = dimensions;
    this._resume = resume;
    this._auteurs = auteurs;
    this._avis = avis;
    this._type = type;
    this._cover = cover;
    this._genre = genre;
    this._proprio_L = proprio_L;
    this._lecteurs = lecteurs;
    this._biblio_L = biblio_L;
  }

}
