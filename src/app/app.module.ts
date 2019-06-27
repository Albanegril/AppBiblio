import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule, NavController} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
 import { ConnexionPourquoiPage } from '../pages/connexion-pourquoi/connexion-pourquoi';
 import { ConnexionCreationPage } from '../pages/connexion-creation/connexion-creation';
import { BiblioServiceProvider } from '../providers/biblio-service/biblio-service';
import { ExpandableComponent } from "../components/expandable/expandable";
import { GestionCompteProvider } from '../providers/gestion-compte/gestion-compte';
import { HttpClientModule } from '@angular/common/http';
import { LienFireBaseProvider } from '../providers/lien-fire-base/lien-fire-base';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {AjoutLivreIsbnScannerPage} from "../pages/ajout-livre-isbn-scanner/ajout-livre-isbn-scanner";
import {AjoutLivreQrScannerPage} from "../pages/ajout-livre-qr-scanner/ajout-livre-qr-scanner";

import { Camera } from '@ionic-native/camera';

import {AngularFireModule} from "@angular/fire";
import { firebaseConfig } from './credentials';
import {AngularFirestoreModule, AngularFirestore} from '@angular/fire/firestore';
import {IonicStorageModule} from "@ionic/storage";
import { LienStorageProvider } from '../providers/lien-storage/lien-storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ConnexionPourquoiPage,
    ConnexionCreationPage,
    AjoutLivreQrScannerPage,
    AjoutLivreIsbnScannerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(firebaseConfig),
  //  IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ConnexionPourquoiPage,
    ConnexionCreationPage,
    AjoutLivreQrScannerPage,
    AjoutLivreIsbnScannerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BiblioServiceProvider,
    GestionCompteProvider,
    LienFireBaseProvider,
    BarcodeScanner,
    Camera,
    AngularFirestore,
    LienStorageProvider,
  ]
})
export class AppModule {}
