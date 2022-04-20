import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404Component } from './error404.component';
import {ShareModule} from "../../share/share.module";



@NgModule({
  declarations: [
    Error404Component
  ],
  imports: [
    CommonModule,
    ShareModule,
  ]
})
export class Error404Module { }
