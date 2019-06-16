import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListLecteursPage } from './list-lecteurs';

@NgModule({
  declarations: [
    ListLecteursPage,
  ],
  imports: [
    IonicPageModule.forChild(ListLecteursPage),
  ],
})
export class ListLecteursPageModule {}
