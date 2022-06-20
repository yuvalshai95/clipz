import { TabComponent } from './../tab/tab.component';
import {
  QueryList,
  Component,
  AfterContentInit,
  ContentChildren,
} from '@angular/core';

@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.scss'],
})
export class TabsContainerComponent implements AfterContentInit {
  // Getting tabs by ng-content as children
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent> =
    new QueryList();

  constructor() {}

  // Life cycle to make sure we have the projected data
  ngAfterContentInit(): void {
    const activeTabs = this.tabs?.filter((tab) => tab.isActive);
    // Make first tab selected by default
    if (!activeTabs || !activeTabs.length) this.selectTab(this.tabs!.first);
  }

  selectTab(tab: TabComponent) {
    // Make sure no tab is selected by changing all to false
    this.tabs?.forEach((tab) => (tab.isActive = false));
    tab.isActive = true;

    // prevent <a> tag default behavior by returning false
    return false;
  }
}
