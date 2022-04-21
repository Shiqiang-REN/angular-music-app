import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SliderStyle} from "./slider-types";

@Component({
  selector: 'app-slider-track',
  template: `<div class="slider-track" [class.buffer]="buffer" [ngStyle]="style"></div>`
})
export class SliderTrackComponent implements OnInit, OnChanges {

  @Input() sliderVertical = false
  @Input() length: number|null
  @Input() buffer = false

  style: SliderStyle = {}

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['length']) {
      if (this.sliderVertical) {
        this.style.height = this.sliderVertical + '%'
        this.style.left = null
        this.style.width = null
      } else {
        this.style.width = this.length + '%'
        this.style.bottom = null
        this.style.height = null
      }
    }
  }


}
