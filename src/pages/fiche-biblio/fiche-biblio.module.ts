import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FicheBiblioPage } from './fiche-biblio';

@NgModule({
  declarations: [
    FicheBiblioPage,
  ],
  imports: [
    IonicPageModule.forChild(FicheBiblioPage),
  ],
})
export class FicheBiblioPageModule {}
