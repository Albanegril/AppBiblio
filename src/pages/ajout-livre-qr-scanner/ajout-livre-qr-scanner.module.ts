import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjoutLivreQrScannerPage } from './ajout-livre-qr-scanner';

@NgModule({
  declarations: [
    AjoutLivreQrScannerPage,
  ],
  imports: [
    IonicPageModule.forChild(AjoutLivreQrScannerPage),
  ],
})
export class AjoutLivreQrScannerPageModule {}
