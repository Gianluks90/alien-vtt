import { Component } from "@angular/core";
import { DialogWrapper } from "../../ui/dialog-wrapper/dialog-wrapper";
import { DialogRef } from "@angular/cdk/dialog";
import { SoundClick } from "../../../directives/sound-click";

interface DeleteDialogResult {
  success: boolean;
  message?: string;
}

@Component({
  selector: "app-delete-dialog",
  imports: [DialogWrapper, SoundClick],
  templateUrl: "./delete-dialog.html",
  styleUrl: "./delete-dialog.scss",
})
export class DeleteDialog {

  constructor(private dialogRef: DialogRef<DeleteDialogResult>) {}

  confirm() {
    this.dialogRef.close({
      success: true,
      message: "Delete confirmed!"
    })
  }

  public close(): void {
    this.dialogRef.close({
      success: false,
      message: "Delete cancelled."
    });
  }
}
