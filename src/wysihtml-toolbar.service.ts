import { Injectable } from "@angular/core"

import { WysiHtmlToolbarComponent } from './wysihtml-toolbar.component';

class KeyValueObject {
  constructor(public key: string, public value: any) {}
}

/**
 * Registers all available toolbars by id
 */
@Injectable()
export class WysiHtmlToolbarService {

  /**
   * Registry object for toolbars
   */
  private registry: KeyValueObject[] = [];
  /**
   * Gets the toolbar reference
   * @param  {string}                   id [description]
   * @return {WysiHtmlToolbarComponent}    [description]
   */
  public getToolbar(id: string) : WysiHtmlToolbarComponent {
    let result: WysiHtmlToolbarComponent = null;
    if(this.hasId(id)) {
      result = this.registry.find((x) => x.key == id).value as WysiHtmlToolbarComponent;
    }
    return result;
  }

  /**
   * Check if registry has requested id
   */
  private hasId(id:string) : boolean {
    return this.registry.some((x) => x.key == id);
  }

  /**
   * Adds the toolbar to registry
   * @param  {WysiHtmlToolbarComponent} toolbar [description]
   * @param  {string}                   id      [description]
   * @return {[type]}                           [description]
   */
  public addToolbar(toolbar: WysiHtmlToolbarComponent, id : string) {
    if(this.hasId(id) == false) {
      let entry = new KeyValueObject(id, toolbar);
      this.registry.push(entry);
    } else {
      console.warn("ToolbarService: id was already reserved", id);
    }
  }

  /**
   * Removes toolbar by component reference
   * @param  {WysiHtmlToolbarComponent} toolbar [description]
   * @return {[type]}                           [description]
   */
  public removeToolbar(toolbar: WysiHtmlToolbarComponent) {
    this.registry = this.registry.filter((x) => x.value != toolbar);
  }

  /**
   * Removes toolbar by Id reference
   * @param  {string} id [description]
   * @return {[type]}    [description]
   */
  public removeToolbarById(id: string) {
    this.registry = this.registry.filter((x) => x.key != id);
  }
}
