import { Component, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizationService } from '@angular/platform-browser';
import { WysiHtmlToolbarService } from 'angular2-voog-wysihtml';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe {
  constructor(private sanitizer:DomSanitizationService){}

  transform(style) {
    return this.sanitizer.bypassSecurityTrustHtml(style);
  }
}

@Component({
  selector: 'example-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.css')]
})
export class AppComponent {
  constructor() {  }
}
