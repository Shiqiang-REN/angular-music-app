import { Injectable } from '@angular/core';
import {ServicesModule} from "./service.module";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import { Singer} from "./types/common.types";
import {map} from "rxjs/operators";
import * as queryString from 'query-string';

type SingerParams = {
  offset: number;
  limit: number;
  area: number;
}

const defaultParams: SingerParams = {
  offset: 0,
  limit: 9,
  area: 96
}

@Injectable({
  providedIn: ServicesModule
})
export class SingersService {

  constructor(private http: HttpClient) { }

  getSingers(args: SingerParams = defaultParams): Observable<Singer[]> {
    const params = new HttpParams({ fromString: queryString.stringify(args) });
    return this.http.get<{ artists: Singer[] }>( 'http://3.25.87.188:3000/artist/list', { params })
      .pipe(map(res => res.artists));
  }
}
