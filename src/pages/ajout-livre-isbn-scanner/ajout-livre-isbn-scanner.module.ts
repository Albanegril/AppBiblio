import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjoutLivreIsbnScannerPage } from './ajout-livre-isbn-scanner';

@NgModule({
  declarations: [
    AjoutLivreIsbnScannerPage,
  ],
  imports: [
    IonicPageModule.forChild(AjoutLivreIsbnScannerPage),
  ],
})
export class AjoutLivreIsbnScannerPageModule {}
