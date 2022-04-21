import { Component, OnInit } from '@angular/core';
import {SearchResult} from "../../../../services/types/common.types";
import {Router} from "@angular/router";

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.less']
})
export class PanelComponent implements OnInit {

  searchResult: SearchResult
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toInfo(path: [string, number]) {
    if (path[1]) {
      this.router.navigate(path)
    }
  }
}
