import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListLecturesPage } from './list-lectures';

@NgModule({
  declarations: [
    ListLecturesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListLecturesPage),
  ],
})
export class ListLecturesPageModule {}
