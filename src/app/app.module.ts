import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ConnexionPourquoiPage,
    ConnexionCreationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ConnexionPourquoiPage,
    ConnexionCreationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BiblioServiceProvider,
    GestionCompteProvider,
    LienFireBaseProvider
  ]
})
export class AppModule {}
