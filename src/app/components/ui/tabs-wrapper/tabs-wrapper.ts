import { Component, ContentChildren, input, output, QueryList } from "@angular/core";
import { TabContent } from "../../../directives/tab-content";
import { NgTemplateOutlet } from "@angular/common";

interface tabClickedEvent {
  index: number;
  label: string;
}

@Component({
  selector: "app-tabs-wrapper",
  imports: [NgTemplateOutlet],
  templateUrl: "./tabs-wrapper.html",
  styleUrl: "./tabs-wrapper.scss",
})
export class TabsWrapper {
  public tabs = input<string[]>([]);
  public tabChanged = output<tabClickedEvent>();
  public activeTab = 0;

  @ContentChildren(TabContent)
  contents!: QueryList<TabContent>;

  public selectTab(index: number) {
    this.activeTab = index;
    this.tabChanged.emit({ index, label: this.tabs()[index] });
  }

  get activeContent() {
    return this.contents?.find(c => c.tabContent === this.activeTab);
  }
}