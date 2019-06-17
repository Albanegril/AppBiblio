import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Livre} from "../../models/Livre";
import {DataISBN} from "./dataISBN";

/*
  Generated class for the BiblioServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BiblioServiceProvider {

  constructor(public http: HttpClient,
              // private storage: Storage,
  ) {
    console.log('Hello BiblioServiceProvider Provider');
  }

  getLivreISBN(isbn: any): Promise<any> {
    const url: string = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn;
    //2070584623
    //0439554934

    console.log(url);
    return new Promise(resolve => {
      let headers: HttpHeaders = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('content-type', 'text/json');
      headers.append('Accept', 'application/json');
      headers.append('content-type', 'application/json');

      this.http.get(url, {headers: headers}).subscribe(data => {
        console.log('data : ', data);
        let json: DataISBN = data as DataISBN;

        // nécessaire car les info retournées ne sont pas toujours les mêmes
        let titre:string;
        if (typeof json.items[0].volumeInfo.title === "undefined") {titre = "";}
          else {titre = json.items[0].volumeInfo.title;}

        let editeur:string;
        if (typeof json.items[0].volumeInfo.publisher === "undefined") {editeur = "";}
          else {editeur = json.items[0].volumeInfo.publisher;}

        let langue:string;
        if (typeof json.items[0].saleInfo.country === "undefined") {langue = "";}
          else {langue = json.items[0].saleInfo.country;}

        let date:string;
        if (typeof json.items[0].volumeInfo.publishedDate === "undefined") {date = "";}
          else {date = json.items[0].volumeInfo.publishedDate;}

        let pages:number;
        if (typeof json.items[0].volumeInfo.pageCount === "undefined") {pages = null;}
          else {pages = json.items[0].volumeInfo.pageCount;}

        let resume:string;
        if (typeof json.items[0].volumeInfo.description === "undefined") {resume = "";}
          else {resume = json.items[0].volumeInfo.description;}

        let auteurs:string[];
        if (typeof json.items[0].volumeInfo.authors === "undefined") {auteurs = null;}
          else {auteurs = json.items[0].volumeInfo.authors;}

        let cover:string = "";
        if (typeof json.items[0].volumeInfo.imageLinks.thumbnail === "undefined" || json.items[0].volumeInfo.imageLinks.thumbnail === null) {cover = "";}
          else {cover = json.items[0].volumeInfo.imageLinks.thumbnail;}

        let livre: Livre = new Livre();
        livre.setLivre("", titre, isbn.toString(), "", editeur, langue, date, "", pages, "", resume, auteurs, [], "", cover, "", "", [], "")
        console.log('json :', json);
        console.log('data :', data);
        console.log('livre :', livre.titre);

        resolve(livre);

      }, err => {
        console.log(err);
      });
    });
  }

  /*getLivreNumISBN(isbn: number): Promise<any> {
    const url: string = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn;
    //2070584623
    //0439554934

    console.log(url);
    return new Promise(resolve => {
      let headers: HttpHeaders = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('content-type', 'text/json');
      headers.append('Accept', 'application/json');
      headers.append('content-type', 'application/json');

      this.http.get(url, {headers: headers}).subscribe(data => {
        console.log('data : ', data);
        let json: DataISBN = data as DataISBN;

        let livre: Livre = new Livre();
        livre.setLivre("", json.items[0].volumeInfo.title, isbn.toString(), "", json.items[0].volumeInfo.publisher, json.items[0].saleInfo.country, json.items[0].volumeInfo.publishedDate, "", json.items[0].volumeInfo.pageCount, "", json.items[0].volumeInfo.description, json.items[0].volumeInfo.authors, [], "", json.items[0].volumeInfo.imageLinks.thumbnail, "", "", [], "")
        console.log('json :', json);
        console.log('data :', data);
        console.log('livre :', livre.titre);

        resolve(livre);

      }, err => {
        console.log(err);
      });
    });
  }*/

}

