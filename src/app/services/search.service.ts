import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {SearchResult} from "./types/common.types";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient
  ) { }

  search(keywords: string): Observable<SearchResult> {
    const params = new HttpParams().set('keywords', keywords)
    return this.http.get<{ result: SearchResult }>('http://3.25.87.188:3000/search/suggest', { params })
      .pipe(map(res => res.result))
  }
}
