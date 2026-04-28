import { Directive, Input, input, TemplateRef } from "@angular/core";

@Directive({
  selector: "[tabContent]",
})
export class TabContent {
  @Input() tabContent!: number;

  constructor(public template: TemplateRef<any>) {}
}
