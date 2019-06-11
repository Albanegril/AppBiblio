import {Lecteur} from "./Lecteur";

export class Livre {

  private _id_L: string;

  private _titre: string;
  private _isbn: string;
  private _format: string;
  private _editeur: string;
  private _langue: string;
  private _date: Date;
  private _edition: string;
  private _nbPages: number;
  private _dimensions: string;
  private _resume: string;
  private _auteurs: string[];
  private _avis: string[];
  private _type: string;
  private _cover: string; //URL ? ou BD ?
  private _genre: string; //Genre[] ? // type enum ?

  private _proprio_L: Lecteur;
  private _lecteurs: Lecteur[];


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

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
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

  get proprio_L(): Lecteur {
    return this._proprio_L;
  }

  set proprio_L(value: Lecteur) {
    this._proprio_L = value;
  }

  get lecteurs(): Lecteur[] {
    return this._lecteurs;
  }

  set lecteurs(value: Lecteur[]) {
    this._lecteurs = value;
  }

  /*  addLivre(title:string, language: string, date_published: Date, authors: string[], cover: string) {
    //livre = new Livre(title, title,"", "", "", "", "", language, date_published, "", 0, "", "", "" , "", authors, null, null, cover);
    let livre = new Livre(title, "", "", language, date_published, "" , 0, "", authors, cover, null);
  }*/


  setLivre(id_L: string, titre: string, isbn: string, format: string, editeur: string, langue: string, date: Date, edition: string, nbPages: number, dimensions: string, resume: string, auteurs: string[], avis: string[], type: string, cover: string, genre: string, proprio_L: Lecteur, lecteurs: Lecteur[]) {
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
  }

  setLivreOpenLibrary(id_L: string, titre: string, isbn: string, format: string, editeur: string, langue: string, date: Date, edition: string, nbPages: number, dimensions: string, resume: string, auteurs: string[], avis: string[], type: string, cover: string, genre: string, proprio_L: Lecteur, lecteurs: Lecteur[]) {
    this._id_L = id_L;
    this._titre = titre;
    this._editeur = editeur;
    this._langue = langue;
    this._date = date;
    this._edition = edition;
    this._nbPages = nbPages;
    this._resume = resume;
    this._auteurs = auteurs;
    this._avis = avis;
    this._type = type;
    this._cover = cover;
    this._proprio_L = proprio_L;
  }

}
