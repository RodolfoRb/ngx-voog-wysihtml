import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';

import { WysiHtmlModule } from 'angular2-voog-wysihtml';

import { AppComponent, SafeHtmlPipe } from './app.component';

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    WysiHtmlModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AppModule {}
