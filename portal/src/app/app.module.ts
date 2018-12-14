import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule

    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
