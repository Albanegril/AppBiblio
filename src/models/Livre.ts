import {Lecteur} from "./Lecteur";

export class Livre {
  id_L: number;
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

  proprio_L: Lecteur;

  constructor(title_long: string, isbn: string, publisher: string, language: string, date_published: Date, edition: string, pages: number, synopsys: string, authors: string[], cover: string, proprio_L: Lecteur) {
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
  }

  addLivre(title:string, language: string, date_published: Date, authors: string[], cover: string) {
    let livre: Livre;
    livre = new Livre(title, "", "", language, date_published, "", 0, "", authors, cover, null);

  }



}
