import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Livre} from "../../models/Livre";
import {DataISBN} from "./dataISBN";
import {Subject} from "rxjs";
import {BarcodeScanResult} from "@ionic-native/barcode-scanner";
import {Lecteur} from "../../models/Lecteur";

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
    // isbn = "0201558025";
    const url: string = 'https://openlibrary.org/api/books?bibkeys=ISBN:' + isbn.text + '&jscmd=data&format=json';
    console.log(url);
    return new Promise(resolve => {
      let headers: HttpHeaders = new HttpHeaders();
      headers.append('Access-Control-Allow-Orig....in', '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept', 'application/json');
      headers.append('content-type', 'application/json');

      this.http.get(url, {headers: headers}).subscribe(data => {
        let json: Livre = data as Livre;

        resolve(json);

        console.log(json);
        // dismiss modal
        // open page formulaire ajout livre
        // remplir les inputs avec les info récupérées

      }, err => {
        console.log(err);
      });
    });
  }

  getLivreNumISBN(isbn: number): Promise<any> {
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
  }

}

