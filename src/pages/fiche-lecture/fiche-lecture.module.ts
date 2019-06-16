import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FicheLecturePage } from './fiche-lecture';

@NgModule({
  declarations: [
    FicheLecturePage,
  ],
  imports: [
    IonicPageModule.forChild(FicheLecturePage),
  ],
})
export class FicheLecturePageModule {}
