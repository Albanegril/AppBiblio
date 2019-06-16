import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditLivrePage } from './edit-livre';

@NgModule({
  declarations: [
    EditLivrePage,
  ],
  imports: [
    IonicPageModule.forChild(EditLivrePage),
  ],
})
export class EditLivrePageModule {}
