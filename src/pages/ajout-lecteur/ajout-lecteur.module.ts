import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjoutLecteurPage } from './ajout-lecteur';

@NgModule({
  declarations: [
    AjoutLecteurPage,
  ],
  imports: [
    IonicPageModule.forChild(AjoutLecteurPage),
  ],
})
export class AjoutLecteurPageModule {}
