import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjoutMaisonPage } from './ajout-maison';

@NgModule({
  declarations: [
    AjoutMaisonPage,
  ],
  imports: [
    IonicPageModule.forChild(AjoutMaisonPage),
  ],
})
export class AjoutMaisonPageModule {}
