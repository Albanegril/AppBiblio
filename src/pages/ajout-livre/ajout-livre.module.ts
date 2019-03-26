import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjoutLivrePage } from './ajout-livre';

@NgModule({
  declarations: [
    AjoutLivrePage,
  ],
  imports: [
    IonicPageModule.forChild(AjoutLivrePage),
  ],
})
export class AjoutLivrePageModule {}
