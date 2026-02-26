import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitySubmitCloserPageRoutingModule } from './city-submit-closer-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CitySubmitCloserPage } from './city-submit-closer.page';

@NgModule({
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CitySubmitCloserPageRoutingModule
  ],
  declarations: [CitySubmitCloserPage]
})
export class CitySubmitCloserPageModule {}
