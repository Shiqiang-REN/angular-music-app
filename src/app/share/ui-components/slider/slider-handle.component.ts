import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {SliderStyle} from "./slider-types";

@Component({
  selector: 'app-slider-handle',
  template: `<div class="slider-handle" [ngStyle]="style"></div>`
})
export class SliderHandleComponent implements OnInit, OnChanges {

  @Input() sliderVertical = false
  @Input() offset: number|null

  style:SliderStyle = {}

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['offset']) {
      this.style[this.sliderVertical ? 'bottom' : 'left'] = this.offset + '%'
    }
  }

}
