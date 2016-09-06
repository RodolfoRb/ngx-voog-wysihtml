declare module "wysihtml" {
	export = WysihtmlNamespace.wysihtml;
}

declare namespace WysihtmlNamespace {
	export var wysihtml : WysihtmlStatic;

	export interface WysihtmlStatic {
		Editor : EditorFactory;
		toolbar : WysihtmlToolbarFactory;
	}

	export interface WysihtmlToolbarFactory {
		Toolbar :  WysihtmlToolbarFactoryInner;
	}

	export interface WysihtmlToolbarFactoryInner {
		new(editor : WysihtmlEditor, toolbar : string|HTMLElement, show? : boolean) : WysihtmlToolbar;
	}

	export interface WysihtmlToolbar {
		destroy() : void;
		_updateLinkStates() : void;
		composer: any;
		container: HTMLElement;
		editor: WysihtmlEditor;
		commandsDisabled: boolean;
	}

	export interface WysihtmlEditor {

		destroy() : void;
		composer : WysihtmlEditorComposer;
		currentView : WysihtmlEditorView;
		sourceView : any;
		toolbar : any;
		fire(event: string, value: any);

		/**
		 * Returns current editor configuration parameters
		 */
		config? : EditorOptions;


		on(event:string, Function);

		/**
		 * Parses and cleans the content of editor. Parameter rules is optional and if omitted uses rules provided at initiation. Custom rules parameter can be used for example for cleaning to plain text (using empty parser rules set):
		 */
		cleanup(rules? : Object);

		/**
		 * Deactivate editor (make it readonly)
		 */
		disable() : void;

		/**
		 * Activate editor disable previously by .disable()
		 */
		enable() : void;

		/**
		 * Sets focus to editable area.
		 */
		focus() : void;

		/**
		 * It returns the cleaned HTML content of editor.
		 * @param  {boolean} parse [description]
		 * @return {[type]}        [description]
		 */
		getValue(parse? : boolean);

		/**
		 * Returns if content empty placeholder is visible.
		 * @return {boolean} [description]
		 */
		hasPlaceholderSet() : boolean;

		/**
		 * Returns if wysihtml is supported in current browser.
		 * @return {boolean} [description]
		 */
		isCompatible() : boolean;

		/**
		 * Sets editor content to given html string. Attribute parse can be set to false to bypass HTML cleanup on insertion. Default is true.
		 * @param  {string}  html  [description]
		 * @param  {boolean} parse [description]
		 * @return {[type]}        [description]
		 */
		setValue(html : string, parse?: boolean);

	}

	export interface EditorOptions {
		/**
		 * Will set class name on the iframe and on the iframe's body. Used only in iframe mode.
		 */
		name?: string;

		/**
		 * Sets whether the editor should look like the textarea (by adopting styles)
		 */
		style?: boolean;

		/**
		 * Sets ID of the default toolbar element or DOM node defining the element used for toolbar. It is used only for the default toolbar bundled with wysihtml-toolbar.js. If custom toolbar logic is used or no toolbar required the file wysihtml.js should be used instead to reduce code overhead.
		 */
		toolbar?: string|HTMLElement;

		/**
		 * Sets if default toolbar is displayed after initiation or only when editable area is focused.
		 */
		showToolbarAfterInit?: boolean;

		/**
		 * Sets if default toolbar shows dialogs in toolbar when their related text format state becomes active (click on link in text opens link dialogue).
		 */
		showToolbarDialogsOnSelection?: boolean;

		/**
		 * Sets whether urls, entered by the user should automatically become clickable-links
		 */
		autoLink?: boolean;

		/**
		 * Sets whether tab key should be treated as tab insertion in text or default behaviour of browser (to skip to next field).
		 */
		handleTabKey?: boolean;

		/**
		 * Turns on table editing events and cell selection tracking.
		 */
		handleTables?: boolean;

		/**
		 * Object which includes parser rules to apply for html for code cleanup
		 */
		parserRules?: Object;

		/**
		 * Array of parserRules objects which includes parser rules when the user inserts content via copy & paste. Can be configured to detect parts of pasted content via regexp and apply appropriate ruleset. If null parserRules will be used instead.
		 */
		pasteParserRulesets?: [Object];

		/**
		 * Parser method to use when the user inserts content via copy & paste.
		 */
		parser(htmlOrElement : string|HTMLElement, clearInternals : any);

		/**
		 * Object containting class names that wysihtml uses
		 */
		classNames?: Object;

		/**
		 * Sets if senseless <span> elements (empty or without attributes) should be un-wrapped. Webkit browsers are very eager to add all kinds of junk <spans> around the code just for browsers internal reference. Keeping this value true will keep reduce the amount of these spans.
		 */
		cleanUp?: boolean;

		/**
		 * By default wysihtml will insert a <br> for line breaks, set this to false to use <p>
		 */
		useLineBreaks?: boolean;

		/**
		 * Array (or single string) of stylesheet urls to be loaded in the editor's iframe. Used only in iframe mode.
		 */
		stylesheets?: [string]|string;

		/**
		 * Placeholder string to use. Defaults to the placeholder attribute on the <textarea> element or data-placeholder attribute on <div> element.
		 */
		placeholderText?: string;
	}

	export interface EditorFactory {
		new(elementId: string, options? : any) : WysihtmlEditor;
		new(elementId: HTMLElement, options? : any) : WysihtmlEditor;
	}

	export interface WysihtmlEditorCommand {
		exec(command : string, value?: any) : void;
	}

	export interface WysihtmlEditorView {
		name : string;
	}
	export interface WysihtmlEditorComposer {
		commands: WysihtmlEditorCommand;
	}
}
