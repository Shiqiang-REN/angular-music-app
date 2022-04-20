import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {CommonModule, registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {CoreModule} from './core/core.module'
import {ShareModule} from "./share/share.module";
import {AppRoutingModule} from "./app-routing.module";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {AppStoreModule} from "./store/app-store.module";




registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    AppStoreModule,
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    CommonModule,
  ],
  exports: [
    ShareModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
