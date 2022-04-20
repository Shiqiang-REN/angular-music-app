import { NgModule } from '@angular/core';
import {playerReducer} from "./reducers/player.reducer";
import {StoreModule} from "@ngrx/store";


@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({player: playerReducer}, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
  ]
})
export class AppStoreModule { }
