import {Lecteur} from "../../models/Lecteur";


declare module dataBiblio {

  export interface Livre {
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

    proprio_L: Lecteur;
  }


}
