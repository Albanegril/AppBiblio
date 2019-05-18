import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Livre} from "../../models/Livre";
import {Subject} from "rxjs";
import {BarcodeScanResult} from "@ionic-native/barcode-scanner";
import {NavController, NavParams} from "ionic-angular";

/*
  Generated class for the BiblioServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BiblioServiceProvider {
  livresList$ = new Subject<Livre[]>();
  private listLivres: Livre[] = [];


  constructor(public http: HttpClient,
             // private storage: Storage,
              public navCtrl: NavController, public navParams: NavParams) {
    console.log('Hello BiblioServiceProvider Provider');
  }

  getLivreISBN(isbn: any):Promise<any>{
   // isbn = "0201558025";
    const url:string = 'https://openlibrary.org/api/books?bibkeys=ISBN:' + isbn.text + '&jscmd=data&format=json';
    console.log(url);
    return new Promise(resolve => {
      let headers: HttpHeaders = new HttpHeaders();
      headers.append('Access-Control-Allow-Orig....in' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');

      this.http.get(url, {headers: headers}).subscribe(data => {
        let json: Livre = data as Livre;

        resolve(json.title);

        console.log(json.title);
        // dismiss modal
        // open page formulaire ajout livre
        // remplir les inputs avec les info récupérées

      }, err => {
        console.log(err);
      });
    });
  }

  getLivreNumISBN(isbn: number):Promise<any>{
    // isbn = "0201558025";
    const url:string = 'https://openlibrary.org/api/books?bibkeys=ISBN:' + isbn + '&jscmd=data&format=json';
    console.log(url);
    return new Promise(resolve => {
      let headers: HttpHeaders = new HttpHeaders();
      headers.append('Access-Control-Allow-Orig....in' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');

      this.http.get(url, {headers: headers}).subscribe(data => {
        let json: Livre = data as Livre;

        console.log("data : " +  data);
        console.log("data : " +  data.toString());
        console.log("json : " +  json);

        resolve(json);
       // this.navCtrl.push('FicheLivrePage', {'data':data});
        console.log("title : " + json.title);
        // dismiss modal
        // open page formulaire ajout livre
        // remplir les inputs avec les info récupérées

      }, err => {
        console.log(err);
      });
    });
  }
/*
  emitList() {
    this.livresList$.next(this.listLivres);
  }

  addNatureView(livre: Livre) {
    this.listLivres.push(livre);
    this.saveList();
    this.emitList();
  }

  saveList() {
    this.storage.set('livres', this.livresList$);
  }

  fetchList() {
    this.storage.get('livres').then(
      (list) => {
        if (list && list.length) {
          this.listLivres = list.slice();
        }
        this.emitList();
      }
    );
  }*/


}
