import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConnexionCreationPage } from './connexion-creation';

@NgModule({
  declarations: [
    ConnexionCreationPage,
  ],
  imports: [
    IonicPageModule.forChild(ConnexionCreationPage),
  ],
})
export class ConnexionCreationPageModule {}
