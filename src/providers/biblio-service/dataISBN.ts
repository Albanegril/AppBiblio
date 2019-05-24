export class DataISBN {
  ISBN: DataLivre;
}


export interface DataLivre {
  publishers: Publisher[];
  pagination: string;
  table_of_contents: TableOfContent[];
  title: string;
  url: string;
  identifiers: Identifiers;
  subjects: Subject[];
  publish_date: string;
  key: string;
  authors: Author[];
  subtitle: string;
  publish_places: PublishPlace[];
  subject_times: SubjectTime[];
}


export interface Publisher {
    name: string;
  }

  export interface TableOfContent {
    title: string;
    label: string;
    pagenum: string;
    level: number;
  }

  export interface Identifiers {
    openlibrary: string[];
    isbn_10: string[];
  }

  export interface Subject {
    url: string;
    name: string;
  }

  export interface Author {
    url: string;
    name: string;
  }

  export interface PublishPlace {
    name: string;
  }

  export interface SubjectTime {
    url: string;
    name: string;
  }



