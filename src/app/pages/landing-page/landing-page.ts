import { Component } from "@angular/core";
import { APP_VERSION } from "../../consts/app-version";
import { Dialog } from "@angular/cdk/dialog";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth-service";
import { AuthDialog } from "../../components/auth-dialog/auth-dialog";
import { DIALOGS_CONFIG } from "../../consts/dialogsConfig";

@Component({
  selector: "app-landing-page",
  imports: [],
  templateUrl: "./landing-page.html",
  styleUrl: "./landing-page.scss",
})
export class LandingPage {
  public vers = APP_VERSION;

  constructor(private dialog: Dialog, private authService: AuthService, private router: Router) {}

   public openAuthDialog(): void {
    const dialogRef = this.dialog.open(AuthDialog, {
      ...DIALOGS_CONFIG
    });

    dialogRef.closed.subscribe((result: any) => {
      if (!result?.success) return;
      if (result?.message === 'register') {
        this.authService.createWithEmailAndPassword(result?.credentials).then(() => {
          this.router.navigate(['/home']);
        });
      } else if (result?.message === 'access') {
        this.authService.loginWithEmailAndPassword(result?.credentials).then(() => {
          this.router.navigate(['/home']);
        })
      }
    });
  }
}
