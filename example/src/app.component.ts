import { Component, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { WysiHtmlToolbarService } from 'angular2-voog-wysihtml';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe {
  constructor(private sanitizer:DomSanitizer){}

  transform(style) {
    return this.sanitizer.bypassSecurityTrustHtml(style);
  }
}

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.css')]
})
export class AppComponent {
  constructor() {  }
}
