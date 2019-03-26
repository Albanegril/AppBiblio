import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListBiblioPage } from './list-biblio';

@NgModule({
  declarations: [
    ListBiblioPage,
  ],
  imports: [
    IonicPageModule.forChild(ListBiblioPage),
  ],
})
export class ListBiblioPageModule {}
