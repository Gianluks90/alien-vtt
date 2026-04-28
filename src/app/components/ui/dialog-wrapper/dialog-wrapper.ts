import { DialogModule } from "@angular/cdk/dialog";
import { Component, input } from "@angular/core";

@Component({
  selector: "app-dialog-wrapper",
  imports: [],
  templateUrl: "./dialog-wrapper.html",
  styleUrl: "./dialog-wrapper.scss",
})
export class DialogWrapper {
  public title = input<string>("missing-title");
  public hideActions = input<boolean>(false);
}
