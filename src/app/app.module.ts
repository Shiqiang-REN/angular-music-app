import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {CoreModule} from './core/core.module'
import {ShareModule} from "./share/share.module";
import {AppRoutingModule} from "./app-routing.module";



registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
  ],
  exports: [
    ShareModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
