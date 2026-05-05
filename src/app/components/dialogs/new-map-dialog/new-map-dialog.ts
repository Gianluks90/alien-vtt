import { DialogRef, DIALOG_DATA } from "@angular/cdk/dialog";
import { Component, Inject } from "@angular/core";
import { UserData } from "../../../models/UserData";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Timestamp } from "firebase/firestore";
import { MapEditorService } from "../../../services/map-editor-service";
import { DialogWrapper } from "../../ui/dialog-wrapper/dialog-wrapper";

interface NewMapDialogResult {
  success: boolean;
  message?: string;
}

@Component({
  selector: "app-new-map-dialog",
  imports: [DialogWrapper, ReactiveFormsModule],
  templateUrl: "./new-map-dialog.html",
  styleUrl: "./new-map-dialog.scss",
})
export class NewMapDialog {
  public form: FormGroup;

  constructor(
    private mapEditorService: MapEditorService,
    private dialogRef: DialogRef<NewMapDialogResult>,
    @Inject(DIALOG_DATA) public data: { user: UserData },
    private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      isPublic: [false],
    });
  }

  public save(): void {
    const { title, description, isPublic } = this.form.value;
    this.mapEditorService.createEmptyMapData(title, description, isPublic).then(() => {
      this.dialogRef.close({
        success: true
      });
    }).catch((error) => {
      this.dialogRef.close({
        success: false,
        message: error.message
      });
    });
  }

  public close(): void {
    this.dialogRef.close({
      success: false
    });
  }
}
