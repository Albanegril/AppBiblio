import {Lecteur} from "./Lecteur";

export class Livre {
  private _id_L: number;
  title: string;
  title_long: string;
  isbn: string;
  isbn13: string;
  dewey_decimal: string;
  format: string;
  publisher: string;
  language: string;
  date_published: Date;
  edition: string;
  pages: number;
  dimensions: string;
  overview: string;
  excerpt: string;
  synopsys: string;
  authors: string[];
  subjects: string[];
  reviews: string[];

  cover: string; //URL ? ou BD ?
  //genre: Genre[] ?

  private _proprio_L: Lecteur;

  constructor(title: string, title_long: string,
              isbn: string, isbn13: string, dewey_decimal: string,
              format: string, publisher: string, language: string,
              date_published: Date, edition: string, pages: number,
              dimensions: string, overview: string, excerpt: string,
              synopsys: string, authors: string[], subjects: string[],
              reviews: string[], cover: string) {
    this.title = title;
    this.title_long = title_long;
    this.isbn = isbn;
    this.isbn13 = isbn13;
    this.dewey_decimal = dewey_decimal;
    this.format = format;
    this.publisher = publisher;
    this.language = language;
    this.date_published = date_published;
    this.edition = edition;
    this.pages = pages;
    this.dimensions = dimensions;
    this.overview = overview;
    this.excerpt = excerpt;
    this.synopsys = synopsys;
    this.authors = authors;
    this.subjects = subjects;
    this.reviews = reviews;
    this.cover = cover;
  }

  /*  constructor(title_long: string, isbn: string, publisher: string,
  language: string, date_published: Date, edition: string, pages: number,
  synopsys: string, authors: string[], cover: string, proprio_L: Lecteur) {
    this.title_long = title_long;
    this.isbn = isbn;
    this.publisher = publisher;
    this.language = language;
    this.date_published = date_published;
    this.edition = edition;
    this.pages = pages;
    this.synopsys = synopsys;
    this.authors = authors;
    this.cover = cover;
    this.proprio_L = proprio_L;
  }*/


  get id_L(): number {
    return this._id_L;
  }

  set id_L(value: number) {
    this._id_L = value;
  }

  get proprio_L(): Lecteur {
    return this._proprio_L;
  }

  set proprio_L(value: Lecteur) {
    this._proprio_L = value;
  }

  addLivre(title:string, language: string, date_published: Date, authors: string[], cover: string) {
    let livre: Livre;
    livre = new Livre(title, title,"", "", "", "",
      "", language, date_published, "", 0, "", "",
      "" , "", authors, null, null, cover);
  }



}
