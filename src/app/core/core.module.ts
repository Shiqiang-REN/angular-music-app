import { NgModule } from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ServicesModule} from "../services/service.module";
import {PagesModule} from "../pages/pages.module";
import {ShareModule} from "../share/share.module";
import {en_US, NZ_I18N} from "ng-zorro-antd/i18n";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ServicesModule,
    PagesModule,
    ShareModule,
  ],
  exports: [
    ShareModule,
    AppRoutingModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
})
export class CoreModule { }
