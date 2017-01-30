# Angular 2 Voog Wysihtml

<a href="https://badge.fury.io/js/angular2-voog-wysihtml"><img src="https://badge.fury.io/js/angular2-voog-wysihtml.svg" align="right" alt="npm version" height="18"></a>

This library is wrapper for the popular [Wysihtml library](http://wysihtml.com/) by Voog. 

See a live example application <a href="https://zefoy.github.io/ngx-voog-wysihtml/">here</a>.

### Building the library

    npm install
    npm run build

### Running the example

    cd example
    npm install
    npm start

### Installing and usage

    npm install angular2-voog-wysihtml --save-dev

##### Load the module for your app:

```javascript
import { WysiHtmlModule } from 'angular2-voog-wysihtml';

@NgModule({
  ...
  imports: [
    ...
    WysiHtmlModule
  ]
})
```

##### Use it in your html template:

```html
<wysihtml-toolbar #toolbar>
  <a data-wysihtml5-command="bold">bold</a>
  <a data-wysihtml5-command="italic">italic</a>
  <a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h1">H1</a>
  <a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="p">P</a>
</wysihtml-toolbar>

<wysihtml-editor [value]="''" [placeholder]="'This is a placeholder'" [toolbar]="toolbar">
</wysihtml-editor>
```

```javascript
[value]        // The textual value (html content) for the editor. 
[toolbar]      // Toolbar reference, either template reference or a DOM id.
[placeholder]  // Placeholder text for the editor, shown when the content is empty.
```

For more detailed documentation with all the supported options see [Wysihtml by Voog documentation](https://github.com/Voog/wysihtml/).
