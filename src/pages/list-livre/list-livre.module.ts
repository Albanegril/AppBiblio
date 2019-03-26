import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListLivrePage } from './list-livre';

@NgModule({
  declarations: [
    ListLivrePage,
  ],
  imports: [
    IonicPageModule.forChild(ListLivrePage),
  ],
})
export class ListLivrePageModule {}
