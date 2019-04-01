import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListBiblioPage } from './list-biblio';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    ListBiblioPage,
  ],
  imports: [
    IonicPageModule.forChild(ListBiblioPage),
    ComponentsModule,
  ],
})
export class ListBiblioPageModule {}
