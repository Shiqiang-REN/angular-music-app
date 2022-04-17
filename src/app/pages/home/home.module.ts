import { NgModule } from '@angular/core';
import {HomeComponent} from "./home.component";
import {ShareModule} from "../../share/share.module";
import {NzCarouselModule} from "ng-zorro-antd/carousel";
import {CommonModule} from "@angular/common";
import { MemberCardComponent } from './components/member-card/member-card.component';



@NgModule({
  declarations: [
    HomeComponent,
    MemberCardComponent,
  ],
  imports: [
    ShareModule,
    NzCarouselModule,
    CommonModule,
  ]
})
export class HomeModule { }
