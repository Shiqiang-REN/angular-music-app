import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider.component';
import {SliderHandleComponent} from "./slider-handle.component";
import {SliderTrackComponent} from "./slider-track.component";



@NgModule({
  declarations: [
    SliderComponent,
    SliderHandleComponent,
    SliderTrackComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SliderComponent
  ]
})
export class SliderModule { }
