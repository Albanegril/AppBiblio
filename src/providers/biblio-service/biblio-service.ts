import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Livre} from "../../models/Livre";
import {Subject} from "rxjs";

/*
  Generated class for the BiblioServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BiblioServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello BiblioServiceProvider Provider');
  }

  getLivreISBN(isbn:string):Promise<any>{
    isbn = "0201558025";
    const url:string = 'https://openlibrary.org/api/books?bibkeys=ISBN:' + encodeURI(isbn) + '&jscmd=data&format=json';
    console.log(url);
    return new Promise(resolve => {
      let headers: HttpHeaders = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');

      this.http.get(url, {headers: headers}).subscribe(data => {
        let json: Livre = data as Livre;

        resolve(json.title);
      }, err => {
        console.log(err);
      });
    });
  }



}
