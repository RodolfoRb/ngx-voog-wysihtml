import wysihtml = require('wysihtml');

import { Component, AfterViewInit, ViewChild, ElementRef, Input, Output, EventEmitter, ViewEncapsulation, OnDestroy, OnInit } from '@angular/core';

import { WysiHtmlEditorComponent } from './wysihtml-editor.component';
import { WysiHtmlToolbarService } from './wysihtml-toolbar.service';

@Component({
  selector: 'wysihtml-toolbar',
  template: require('./wysihtml-toolbar.component.html'),
  styles: [require('./vendor/wysihtml.css')],
  encapsulation: ViewEncapsulation.None
})
export class WysiHtmlToolbarComponent implements OnInit, OnDestroy {
  @Input() disable : boolean = false;

  private element : ElementRef;
  private toolbar : any; //WysihtmlToolbar

  private _currentEditor : any; //WysihtmlEditor
  /**
   * Current editor attached to the toolbar
   * @param  {WysihtmlEditor} newEditor [description]
   * @return {[type]}                   [description]
   */
  public set currentEditor(newEditor : any) { //WysihtmlEditor
    if(newEditor == null) {
      this._currentEditor = null;
      this.removeToolbarTarget();
    }
    else if(newEditor !== this._currentEditor) {
      this.changeToolbarTarget(newEditor);
      this._currentEditor = newEditor;
    }
  }
  public get currentEditor() : any { //WysihtmlEditor
    return this._currentEditor;
  }

  private changeToolbarTarget(newEditor : any) { //WysihtmlEditor
    if(this.toolbar == null) {
      this.toolbar = this.buildToolbar(newEditor);
    }

    this.toolbar.composer = newEditor.composer;
    this.toolbar.editor = newEditor;
    this.toolbar._updateLinkStates();
  }


  constructor(private rootElement : ElementRef, private toolbarService : WysiHtmlToolbarService) {
    this.element = rootElement;
    let id = this.element.nativeElement.id;
    if(id) {
      this.toolbarService.addToolbar(this, id);
    }
  }

  private removeToolbarTarget() {
    this.toolbar.composer = null;
    this.toolbar.editor = null;
  }

  /**
   * Utility method for stopping events from firing if no editors are attachd
   * @param  {Event}  event [description]
   * @return {[type]}       [description]
   */
  handleClick(event : Event) {
    if(this._currentEditor == null || this.disable) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  getToolbar() : any { // WysihtmlToolbar
    return this.toolbar;
  }
  /**
   * Builds the toolbar for the component
   * @param  {WysihtmlEditor}  editor [description]
   * @return {WysihtmlToolbar}        [description]
   */
  buildToolbar(editor : any) : any { //
    let toolbarContainer : HTMLElement = this.element.nativeElement;
    let toolbar = new wysihtml.toolbar.Toolbar(editor, toolbarContainer, true);
    return toolbar;
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.toolbarService.removeToolbar(this);
    if(this.toolbar) {
      this.toolbar.destroy();
    }
  }
}
