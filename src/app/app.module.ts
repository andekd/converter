import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WeigthComponent } from './weigth/weigth.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { SpeedComponent } from './speed/speed.component';

@NgModule({
  declarations: [
    AppComponent,
    WeigthComponent,
    TemperatureComponent,
    SpeedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
