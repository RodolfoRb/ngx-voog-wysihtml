import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { WysiHtmlEditorComponent }  from './wysihtml-editor.component';
import { WysiHtmlToolbarService }   from './wysihtml-toolbar.service';
import { WysiHtmlToolbarComponent } from './wysihtml-toolbar.component';

@NgModule({
    imports: [CommonModule],
    declarations: [WysiHtmlToolbarComponent, WysiHtmlEditorComponent],
    providers: [WysiHtmlToolbarService],
    exports: [WysiHtmlToolbarComponent, WysiHtmlEditorComponent]
})
export class WysiHtmlModule {}
