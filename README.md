angular2-voog-wysihtml
======================

This library is wrapper for the popular [Wysihtml library](https://github.com/Voog/wysihtml) by Voog. It contains the basic components for the editor and the toolbar. In addition to containing all the basic features of the original library, the wrapper includes a way to handle one toolbar between multiple editor components.

Example app
-----------

Example app can be found inside the *example* folder. To use it you must install the required packages and then build the project.

    cd example
    npm install
    npm start

Getting started
---------------

This package includes two components, 1) WysihtmlEditorComponent which is the actual html editor component and 2) WysihtmlToolbarComponent which provides the toolbar for the editor component.

**WysihtmlEditorComponent**

Add a wysihtml-editor element into your your template:

    <wysihtml-editor></wysihtml-editor>

**Available inputs:**

  - *value*: Initial value for the editor

  - *disabled*: Boolean if the editor should be disabled

  - *placeholder*: Placeholder text string for the editor

  - *config*: Object used to define wysihtml editor, see available properties [here](https://github.com/Voog/wysihtml/wiki/Configuration)

  - *toolbar*: Toolbar reference for the editor, either a *Template reference* or a *DOM id property*

**Example:**

    <wysihtml-editor 
      [value]="'<h1>Hello world</h1>'"
      [placeholder]="'This is a placeholder'"
      [toolbar]="'wysihtmlId'">
    </wysihtml-editor>

**WysihtmlToolbarComponent**

Add a wysihtml-toolbar element with wanted commands ([available commands here](https://github.com/Voog/wysihtml/wiki/Supported-Commands)) into your template:

    <wysihtml-toolbar>
      <a data-wysihtml5-command="bold">bold</a>
      <a data-wysihtml5-command="italic">italic</a>
      <a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h1">H1</a>
      <a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="p">P</a>
    </wysihtml-toolbar>

Give the component a template variable or set an DOM id property

**Template reference**
    
    <wysihtml-toolbar #toolbar></wysihtml-toolbar>

**DOM id property**

    <wysihtml-toolbar id="toolbar"></wysihtml-toolbar>

**Note:** template reference can only be used with an editor that is inside the same component. Use the DOM Id if you want to reference the toolbar inside an another component.
