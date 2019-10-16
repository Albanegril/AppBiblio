import { Component } from '@angular/core';
import {Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {App} from 'ionic-angular';

import { HomePage } from '../pages/home/home';

import * as firebase from 'firebase';
import {GestionCompteProvider} from "../providers/gestion-compte/gestion-compte";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(public app: App, platform: Platform,
              statusBar: StatusBar, splashScreen: SplashScreen,
              private gestionnaireCompte: GestionCompteProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // Initialize Firebase
      // in credentials + app.module
      let config = {
            apiKey: "AIzaSyCq2RijJNcDrINB-P1RPIUrD96SpBIm8LE",
            authDomain: "appbiblio-35f08.firebaseapp.com",
            databaseURL: "https://appbiblio-35f08.firebaseio.com",
            projectId: "appbiblio-35f08",
            storageBucket: "appbiblio-35f08.appspot.com",
            messagingSenderId: "917836731868"
          };
     // AngularFireModule.initializeApp(config);
     // firebase.initializeApp(config);
    });

  }

  openPage(page: any) {
    this.app.getActiveNav().push(page).then(
      ()=>{
        this.app.getActiveNav().setRoot(page);
      });
  }

  closeMenu() {
    //TODO
  }

  deconnexion() {
    this.gestionnaireCompte.deconnexion();
    this.app.getActiveNav().push(HomePage);
  }
}

