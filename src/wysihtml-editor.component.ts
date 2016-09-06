import wysihtml = require('wysihtml');
import parserRules = require("parser_rules");

import { Component, AfterViewInit, ViewChild, ElementRef, Input, Output, EventEmitter, ViewEncapsulation, OnDestroy } from '@angular/core';

import { DomSanitizationService, BROWSER_SANITIZATION_PROVIDERS } from '@angular/platform-browser';

import { WysiHtmlToolbarComponent } from './wysihtml-toolbar.component';
import { WysiHtmlToolbarService } from './wysihtml-toolbar.service';

/**
 * Base struct for all the events sent from the composer
 */
export class WysiHtmlEvent {
  constructor(public type: string, public source: WysiHtmlEditorComponent, public payload: any) {}
}

@Component({
  selector: 'wysihtml-editor',
  template: require("./wysihtml-editor.component.html"),
  encapsulation: ViewEncapsulation.None
})
export class WysiHtmlEditorComponent implements OnDestroy {
  @ViewChild('wysihtml') textArea : ElementRef;
  @Input('width') width = 300;
  @Input('height') height = 150;

  private _initialValue : string;

  /**
   * Contents for the textarea
   * @return {[type]} [description]
   */
  @Input('value') set value(html: any) {
    if(this.editor) {
      this.editor.composer.setValue(html);
    } else {
      this._initialValue = html;
    }
  }

  get value() : any {
    if(this.editor) {
      let val = this.editor.composer.getValue();
      return val;
    }
    return "";
  }

  private _toolbar : WysiHtmlToolbarComponent;
  @Input('toolbar') set toolbar(input : WysiHtmlToolbarComponent) {
    this._toolbar = this.resolveToolbarSource(input);
  };

  get toolbar() : WysiHtmlToolbarComponent {
    return this._toolbar;
  }

  _disable : boolean = false;

  /**
   * Sets the disabled state for the editor
   * @return {[type]} [description]
   */
  @Input('disable') set disable(state : boolean) {
    this.setDisabled(state);
    this._disable = state;
  }

  get disable() : boolean {
    return this._disable;
  }

  private setDisabled(state : boolean) {
    if(this.editor == null) return;

    if(state) {
      this.editor.disable();
    } else {
      this.editor.enable();
    }
  }

  /**
   * Config for toolbar. See available options at https://github.com/Voog/wysihtml/wiki/Configuration
   * @return {[type]} [description]
   */
  @Input('config') config : any;
  /**
   * Placeholder text for the editor
   * @return {[type]} [description]
   */
  @Input('placeholder') placeholder : string;
  /**
  *  When the editor (regardless if rich text or source view) gets blurred
  * @return {[type]} [description]
  */
  @Output('blur') blur = new EventEmitter<WysiHtmlEvent>();
  /**
  *  When the editor (regardless if rich text or source view) receives focus
  * @return {[type]} [description]
  */
  @Output('focus') focus = new EventEmitter<WysiHtmlEvent>();
  /**
  *  When the user pastes or drops content (regardless if rich text or source view)
  * @return {[type]} [description]
  */
  @Output('paste') paste =  new EventEmitter<WysiHtmlEvent>();
  /**
  * When the value changed (regardless if rich text or source view)
  * @return {[type]} [description]
  */
  @Output('change') change = new EventEmitter<WysiHtmlEvent>();
  /**
  *  When switched between source and rich text view
  * @return {[type]} [description]
  */
  @Output('changeView') changeView = new EventEmitter<WysiHtmlEvent>();
  /**
   * When the user invokes an undo action (CMD + Z or via context menu)
   * @return {[type]} [description]
   */
  @Output('undo') undo = new EventEmitter<WysiHtmlEvent>();
  /**
   * When the user invokes a redo action (CMD + Y, CMD + SHIFT + Z or via context menu)
   * @return {[type]} [description]
   */
  @Output('redo') redo = new EventEmitter<WysiHtmlEvent>();
  /**
   * When the editor is fully loaded
   * @return {[type]} [description]
   */
  @Output('load') load = new EventEmitter<WysiHtmlEvent>();
  /**
   * When any interaction happens on the rich text or source view
   * @return {[type]} [description]
   */
  @Output('interaction') interaction = new EventEmitter<WysiHtmlEvent>();
  /**
   * When the user wrote a new word in the rich text view
   * @return {[type]} [description]
   */
  @Output('newword') newword =  new EventEmitter<WysiHtmlEvent>();
  /**
   * When the rich text view gets removed
   * @return {[type]} [description]
   */
  @Output('destroy') destroy =  new EventEmitter<WysiHtmlEvent>();
  /**
   * When the user is about to format something via a rich text command
   * @return {[type]} [description]
   */
  @Output('beforecommand') beforecommand =  new EventEmitter<WysiHtmlEvent>();
  /**
   * When the user formatted something via a rich text command
   * @return {[type]} [description]
   */
  @Output('aftercommand') aftercommand =  new EventEmitter<WysiHtmlEvent>();

  /**
   * Reference to this component's editor
   * @type {WysihtmlEditor}
   */
  public editor;

  constructor(private toolbarService : WysiHtmlToolbarService) {}

  ngAfterViewInit() {
    this.initEditor();

    this.focus.subscribe((x) => {
      if(this._toolbar)
        this._toolbar.currentEditor = this.editor;
    });
  }

  /**
   * Create's the editor instance and the event listeners
   * @return {[type]} [description]
   */
  private initEditor() {
    if(this.editor) return;

    let config = this.config ? this.config : {};
    config.parserRules = config.parserRules || parserRules.wysihtmlParserRules;
    config.toolbar = null;

    try {
      this.editor = new wysihtml.Editor(this.textArea.nativeElement, config);

      this.setEventListeners();

      setTimeout(() => {
        if(this._initialValue) {
          this.editor.setValue(this._initialValue);
        }

        this.setDisabled(this._disable)
      }, 0);

    } catch(e) {
      console.warn("Couldn't initialize wysihtml-editor:", e);
    }
  }

  /**
   * Sets the event listeners
   * @return {[type]} [description]
   */
  private setEventListeners() {
    // TODO: Rework
    this.editor
      .on("paste", (x) => { this.paste.emit(new WysiHtmlEvent("paste", this, x)); })
      .on("blur", (x) => { this.blur.emit(new WysiHtmlEvent("blur", this, x)); })
      .on("focus", (x) => { this.focus.emit(new WysiHtmlEvent("focus", this, x)); })
      .on("change", (x) => { this.change.emit(new WysiHtmlEvent("change", this, x)); })
      .on("change_view", (x) => { this.changeView.emit(new WysiHtmlEvent("change_view", this, x)); })
      .on("undo:composer", (x) => { this.undo.emit(new WysiHtmlEvent("undo:composer", this, x)); })
      .on("redo:composer", (x) => { this.redo.emit(new WysiHtmlEvent("redo:composer", this, x)); })
      .on("interaction", (x) => { this.interaction.emit(new WysiHtmlEvent("interaction", this, x)); })
      .on("load", (x) => { this.load.emit(new WysiHtmlEvent("load", this, x)); })
      .on("newword:composer", (x) => { this.newword.emit(new WysiHtmlEvent("newword:composer", this, x)); })
      .on("beforecommand:composer", (x) => { this.load.emit(new WysiHtmlEvent("beforecommand:composer", this, x)); })
      .on("aftercommand:composer", (x) => { this.newword.emit(new WysiHtmlEvent("aftercommand:composer", this, x)); });
  }

  /**
   * Manually perform a composer command. See available commands at https://github.com/Voog/wysihtml/wiki/Supported-Commands
   * @param  {any}    command [description]
   * @param  {any}    value   [description]
   * @return {[type]}         [description]
   */
  public doCommand(command: any, value: any) {
    //TODO: perhaps add support for delegating calls through the toolbar
    if(this.editor) {
      this.editor.composer.commands.exec(command, value);
    }
  }

  /**
   * Change between composer and textarea
   */
  public changeViewMode(mode : string) {
    if(mode && (mode == "composer" || mode == "textarea")) {
      this.editor.fire("change_view", mode);
    }
  }
  /**
   * Resolves the toolbar source as it can be either a string or a component reference
   * @param  {WysiHtmlToolbarComponent|string} source [description]
   * @return {WysiHtmlToolbarComponent}               [description]
   */
  private resolveToolbarSource(source : WysiHtmlToolbarComponent|string) : WysiHtmlToolbarComponent {
    let type = source.constructor as any;
    let typeName = type.name;
    if(typeName === "WysiHtmlToolbarComponent") {
      return source as WysiHtmlToolbarComponent;
    } else if(typeName === "String") {
      return this.toolbarService.getToolbar(source as string);
    } else {
      console.warn("Unknown type of wysihtml-toolbar reference. Use either id or component reference");
      return null;
    }
  }

  ngOnDestroy() {
    if(this.toolbar && this.toolbar.currentEditor == this.editor) {
      this.toolbar.currentEditor = null;
    }

    this.editor.destroy();
    this.editor = null;
  }
}
