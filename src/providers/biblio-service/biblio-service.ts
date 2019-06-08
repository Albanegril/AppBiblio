import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Livre} from "../../models/Livre";
import {DataISBN} from "./dataISBN";
import {Subject} from "rxjs";
import {BarcodeScanResult} from "@ionic-native/barcode-scanner";
import {Lecteur} from "../../models/Lecteur";

// Changes XML to JSON
function xmlToJson(xml: any) {
  // Create the return object
  let obj = {};

  if (xml.nodeType == 1) { // element
    // do attributes
    if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
      for (let j = 0; j < xml.attributes.length; j++) {
        let attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType == 3) { // text
    obj = xml.nodeValue;
  }

  // do children
  if (xml.hasChildNodes()) {
    for(let i = 0; i < xml.childNodes.length; i++) {
      let item = xml.childNodes.item(i);
      let nodeName = item.nodeName;
      if (typeof(obj[nodeName]) == "undefined") {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof(obj[nodeName].push) == "undefined") {
          let old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
}

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

  getLivreNumISBN(isbn: number): Promise<any> {
    const url: string = 'https://cors-anywhere.herokuapp.com/https://www.goodreads.com/book/isbn/' + isbn + '?key=aRNW7uhuvKbYOs2LsGDeGg&format=xml';
    //https://www.goodreads.com/book/isbn/2070584623?key=aRNW7uhuvKbYOs2LsGDeGg&format=xml
    //2070584623
    //0439554934
    //key: aRNW7uhuvKbYOs2LsGDeGg
    //secret: uDFiZcPF3EeJIBSyeWJMOcz3oTwfxZwzDkM8aEwc

    console.log(url);
    return new Promise(resolve => {
      let headers: HttpHeaders = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin', '*');
      // tentative de contourner le pb d'absence de CORS dans goodreads
      headers.append('X-Requested-With', 'XMLHttpRequest');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    //  headers.append('Accept', 'text/xml');
      headers.append('content-type', 'text/xml');
/*      headers.append('Accept', 'application/json');
      headers.append('content-type', 'application/json');*/

      this.http.get(url, {headers: headers}).subscribe(data => {
        console.log('data : ', data);
        let jsonText = JSON.stringify(xmlToJson(data));
        /*let json: DataISBN = jsonText as DataISBN;
        // let livre: Livre = data as Livre;
        console.log('json :', json);
        console.log('data :', data);*/
        console.log('jsonText :', jsonText);

        let livre: Livre = new Livre();
        livre = this.setLivre(data);

        console.log('livre :', livre.title);

        // console.log('livre :', json.ISBN);

        resolve(livre);

      }, err => {
        console.log(err);
      });
    });
  }

  setLivre(data: any): Livre {
    let livre: Livre = new Livre();
    //livre.id_L();
    console.log("livre :", livre);

    livre.setLivreOpenLibrary(data.ISBN.title,
      data.ISBN.identifiers.isbn_10,
      data.ISBN.publishers.name[0],
      "ENG",
      data.ISBN.publish_date,
      data.ISBN.pagination, /*mettre en int*/
      data.ISBN.authors[0].name,
      data.ISBN.subjects[0].name);

    return livre;
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
    }
  */

}

