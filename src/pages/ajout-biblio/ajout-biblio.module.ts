import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjoutBiblioPage } from './ajout-biblio';

@NgModule({
  declarations: [
    AjoutBiblioPage,
  ],
  imports: [
    IonicPageModule.forChild(AjoutBiblioPage),
  ],
})
export class AjoutBiblioPageModule {}
