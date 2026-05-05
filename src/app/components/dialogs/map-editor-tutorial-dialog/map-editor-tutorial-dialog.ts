import { DialogRef } from "@angular/cdk/dialog";
import { Component } from "@angular/core";
import { DialogWrapper } from "../../ui/dialog-wrapper/dialog-wrapper";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from "@angular/forms";
import { urlValidator } from "../../../validators/valid-url-validators";
import { Router, RouterLink } from "@angular/router";
import { SoundClick } from "../../../directives/sound-click";

interface MapEditorTutorialDialogResult {
  success: boolean;
  message?: string;
  layer?: any;
}

@Component({
  selector: "app-map-editor-tutorial-dialog",
  imports: [DialogWrapper, ReactiveFormsModule, SoundClick],
  templateUrl: "./map-editor-tutorial-dialog.html",
  styleUrl: "./map-editor-tutorial-dialog.scss",
})
export class MapEditorTutorialDialog {
  public form: FormGroup;
  private _imgWidth = 0;
  private _imgHeight = 0;

  constructor(private dialogRef: DialogRef<MapEditorTutorialDialogResult>, private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      layerLabel: ['', Validators.required],
      layerURL: ['', [Validators.required, urlValidator]]
    });

    this.form.get('layerURL')!.valueChanges.subscribe((url) => {
      if (this.form.get('layerURL')!.valid) {
        const img = new Image();
        img.onload = () => {
          this._imgWidth = img.width;
          this._imgHeight = img.height;
        };
        img.src = url;
      } else {
        this._imgWidth = 0;
        this._imgHeight = 0;
      }
    });
  }

  public back(): void {
    this.dialogRef.close({
      success: false,
      message: "Tutorial skipped."
    });
    this.router.navigate(['/home']);
  }

  public confirm(): void {
    this.dialogRef.close({
      success: true,
      message: "Tutorial completed.",
      layer: {
        layerLabel: this.form.get('layerLabel')!.value,
        layerURL: this.form.get('layerURL')!.value,
        width: this._imgWidth,
        height: this._imgHeight
      }
    });
  }
}
