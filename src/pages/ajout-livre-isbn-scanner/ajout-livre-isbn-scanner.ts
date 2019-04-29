import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {BiblioServiceProvider} from "../../providers/biblio-service/biblio-service";

/**
 * Generated class for the AjoutLivreIsbnScannerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajout-livre-isbn-scanner',
  templateUrl: 'ajout-livre-isbn-scanner.html',
})
export class AjoutLivreIsbnScannerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController,
              private barcodeScanner: BarcodeScanner,
              private biblioServiceprovider: BiblioServiceProvider) {

    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      // envoyer code dans service ISBN BD
      this.biblioServiceprovider.getLivreISBN(barcodeData);
      // retourner à la page du formulaire remplie ( passer par ici ?)
    }).catch(err => {
      console.log('Error', err);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjoutLivreIsbnScannerPage');
  }

  close(){
    console.log('fermer AjoutLivreIsbnScannerPage');
    this.viewCtrl.dismiss();
  }

}