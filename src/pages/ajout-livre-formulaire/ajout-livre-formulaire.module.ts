import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjoutLivreFormulairePage } from './ajout-livre-formulaire';

@NgModule({
  declarations: [
    AjoutLivreFormulairePage,
  ],
  imports: [
    IonicPageModule.forChild(AjoutLivreFormulairePage),
  ],
})
export class AjoutLivreFormulairePageModule {}
