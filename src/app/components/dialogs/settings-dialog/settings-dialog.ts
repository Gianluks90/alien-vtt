import { Component, Inject } from "@angular/core";
import { DialogWrapper } from "../../ui/dialog-wrapper/dialog-wrapper";
import { DIALOG_DATA, DialogRef } from "@angular/cdk/dialog";
import { UserService } from "../../../services/user-service";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { UserData } from "../../../models/UserData";

interface SettingsDialogResult {
  success: boolean;
  message?: string;
}

@Component({
  selector: "app-settings-dialog",
  imports: [DialogWrapper, ReactiveFormsModule],
  templateUrl: "./settings-dialog.html",
  styleUrl: "./settings-dialog.scss",
})
export class SettingsDialog {
  public form: FormGroup;
  constructor(
    private userService: UserService,
    private dialogRef: DialogRef<SettingsDialogResult>,
    @Inject(DIALOG_DATA) public data: { user: UserData },
    private fb: FormBuilder) {
    this.form = this.fb.group({
      nickname: [data.user.nickname || ''],
    });
  }

  public save(): void {
    const updatedUserData: UserData = {
      ...this.data.user,
      ...this.form.value
    };
    this.userService.updateUserData(updatedUserData).then(() => {
      this.dialogRef.close({
        success: true,
        message: "Settings saved successfully!"
      });
    }).catch((err) => {
      console.error("Error updating user data:", err);
    });    
  }

  public close(): void {
    this.dialogRef.close({
      success: false
    });
  }
}
