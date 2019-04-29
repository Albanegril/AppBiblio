import {Lecteur} from "./Lecteur";

export class Livre {

  private _id_L: number;

  private _title: string;
  private _title_long: string;
  private _isbn: string;
  private _isbn13: string;
  private _dewey_decimal: string;
  private _format: string;
  private _publisher: string; // = editeur ?
  private _language: string;
  private _date_published: Date;
  private _edition: string;
  private _pages: number;
  private _dimensions: string;
  private _overview: string;
  private _excerpt: string;
  private _synopsys: string; // = resume
  private _authors: string[];
  private _subjects: string[]; // = genre ?
  private _reviews: string[];

  private _cover: string; //URL ? ou BD ?
  //genre: Genre[] ?

  private _proprio_L: Lecteur;
  private _lecteurs: Lecteur[];

  private _type: string; // Faire type enum ?


  get id_L(): number {
    return this._id_L;
  }

  set id_L(value: number) {
    this._id_L = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get title_long(): string {
    return this._title_long;
  }

  set title_long(value: string) {
    this._title_long = value;
  }

  get isbn(): string {
    return this._isbn;
  }

  set isbn(value: string) {
    this._isbn = value;
  }

  get isbn13(): string {
    return this._isbn13;
  }

  set isbn13(value: string) {
    this._isbn13 = value;
  }

  get dewey_decimal(): string {
    return this._dewey_decimal;
  }

  set dewey_decimal(value: string) {
    this._dewey_decimal = value;
  }

  get format(): string {
    return this._format;
  }

  set format(value: string) {
    this._format = value;
  }

  get publisher(): string {
    return this._publisher;
  }

  set publisher(value: string) {
    this._publisher = value;
  }

  get language(): string {
    return this._language;
  }

  set language(value: string) {
    this._language = value;
  }

  get date_published(): Date {
    return this._date_published;
  }

  set date_published(value: Date) {
    this._date_published = value;
  }

  get edition(): string {
    return this._edition;
  }

  set edition(value: string) {
    this._edition = value;
  }

  get pages(): number {
    return this._pages;
  }

  set pages(value: number) {
    this._pages = value;
  }

  get dimensions(): string {
    return this._dimensions;
  }

  set dimensions(value: string) {
    this._dimensions = value;
  }

  get overview(): string {
    return this._overview;
  }

  set overview(value: string) {
    this._overview = value;
  }

  get excerpt(): string {
    return this._excerpt;
  }

  set excerpt(value: string) {
    this._excerpt = value;
  }

  get synopsys(): string {
    return this._synopsys;
  }

  set synopsys(value: string) {
    this._synopsys = value;
  }

  get authors(): string[] {
    return this._authors;
  }

  set authors(value: string[]) {
    this._authors = value;
  }

  get subjects(): string[] {
    return this._subjects;
  }

  set subjects(value: string[]) {
    this._subjects = value;
  }

  get reviews(): string[] {
    return this._reviews;
  }

  set reviews(value: string[]) {
    this._reviews = value;
  }

  get cover(): string {
    return this._cover;
  }

  set cover(value: string) {
    this._cover = value;
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

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

/*  addLivre(title:string, language: string, date_published: Date, authors: string[], cover: string) {
    //livre = new Livre(title, title,"", "", "", "", "", language, date_published, "", 0, "", "", "" , "", authors, null, null, cover);
    let livre = new Livre(title, "", "", language, date_published, "" , 0, "", authors, cover, null);
  }*/



}
