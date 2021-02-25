import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateBusinessRoutingModule } from './create-business-routing.module';
import { CreateBusinessComponent } from './components/create-business/create-business.component';


@NgModule({
  declarations: [
    CreateBusinessComponent
  ],
  imports: [
    CommonModule,
    CreateBusinessRoutingModule
  ]
})
export class CreateBusinessModule { }
