import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
  EventEmitter,
  Output,
  Input,
  OnChanges, SimpleChanges, ViewContainerRef
} from '@angular/core';
import {debounceTime, distinctUntilChanged, fromEvent, pluck} from "rxjs";
import {SearchResult} from "../../../services/types/common.types";
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {PanelComponent} from "./panel/panel.component";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() searchResult :SearchResult
  @ViewChild('nzInput', { static: false }) private nzInput: ElementRef
  @ViewChild('search', { static: false }) private searchRef: ElementRef
  @Output() onSearch = new EventEmitter<string>()

  private overlayRef: OverlayRef
  searchValue:string

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
  }

  //rxjs debounce
  ngAfterViewInit() {
    fromEvent(this.nzInput.nativeElement,'input')
      .pipe(debounceTime(300),pluck('target', 'value'), distinctUntilChanged())
      .subscribe((res) => {
        this.onSearch.emit((res as string))
      })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchResult'] && !changes['searchResult'].firstChange) {
      if (JSON.stringify(this.searchResult) === '{}') {
        this.hideOverlayPanel()
      }else{
        this.showOverlayPanel()
      }
    }
  }

  showOverlayPanel() {
    this.hideOverlayPanel()
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.searchRef)
      .withPositions([{
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top'
      }]).withLockedPosition(true)
    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    })
    const panelPortal = new ComponentPortal(PanelComponent, this.viewContainerRef)
    //pass the data to the search panel component
    const panelRef = this.overlayRef.attach(panelPortal)
    panelRef.instance.searchResult = this.searchResult
  }

  hideOverlayPanel() {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.dispose()
    }
  }

  onBlur() {
    this.hideOverlayPanel()
    this.searchValue = ''
  }

}
