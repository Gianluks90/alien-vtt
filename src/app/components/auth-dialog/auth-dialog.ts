import { Component } from "@angular/core";
import { DialogRef } from "@angular/cdk/dialog";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { TabsWrapper } from "../ui/tabs-wrapper/tabs-wrapper";
import { DialogWrapper } from "../ui/dialog-wrapper/dialog-wrapper";
import { TabContent } from "../../directives/tab-content";
import { passwordMatchValidator } from "../../validators/auth-validators";

interface AuthDialogResult {
  success: boolean;
  credentials?: any;
  message?: string;
}

@Component({
  selector: "app-auth-dialog",
  imports: [DialogWrapper, ReactiveFormsModule, TabsWrapper, TabContent],
  templateUrl: "./auth-dialog.html",
  styleUrl: "./auth-dialog.scss",
})
export class AuthDialog {
  public authForm: FormGroup;
  public selectedTab: number = 0;
  public tabs = ['Accedi', 'Registrati'];

  constructor(private dialogRef: DialogRef<AuthDialogResult>, private fb: FormBuilder) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['']
    }, { validators: passwordMatchValidator })
  }

  public onTabChange(event: { index: number; label: string }): void {
    this.selectedTab = event.index;

    const control = this.authForm.get('confirmPassword');

    if (event.label.toLowerCase() === 'registrati') {
      control?.setValidators([Validators.required, Validators.minLength(6)]);
    } else {
      control?.clearValidators();
    }
    control?.updateValueAndValidity();
  }

  public submit(): void {
    if (this.authForm.invalid) return;
    const result = this.authForm.value;
    this.dialogRef.close({
      success: true,
      credentials: result,
      message: this.tabs[this.selectedTab] === 'Accedi' ? 'access' : 'register'
    })
  }

  public close(): void {
    this.dialogRef.close({
      success: false
    });
  }
}
