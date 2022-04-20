import {Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Input, Inject} from '@angular/core';
import {SliderEventObserverConfig} from "./slider-types";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class SliderComponent implements OnInit {
  @Input() sliderVertical = false
  @Input() bufferPercent: number | null = 0
  @Input() percent: number | null = 0

  constructor() { }

  ngOnInit(): void { }

}
