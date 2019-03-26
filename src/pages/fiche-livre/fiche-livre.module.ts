import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FicheLivrePage } from './fiche-livre';

@NgModule({
  declarations: [
    FicheLivrePage,
  ],
  imports: [
    IonicPageModule.forChild(FicheLivrePage),
  ],
})
export class FicheLivrePageModule {}
