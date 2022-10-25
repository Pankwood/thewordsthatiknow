import { delay } from 'rxjs/internal/operators';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  userAlreadyExists: boolean = false;
  passwordMatch: boolean = true;
  modalId: string;
  constructor(private modalService: ModalService, private authService: AuthService, private serviceNotification: NotificationService) {
    this.modalId = modalService.modalSignUpID;
  }

  signup(form: any) {
    //Check if password and confirm password have the same value
    if (form.controls.password.value != form.controls.confirmPassword.value) {
      this.passwordMatch = false;
    }
    else if (form.valid) {
      this.passwordMatch = true;
      //Add the new user
      this.authService.signup(form.value).subscribe(() => {

        //Automaticaly login with new user information
        if (this.authService.login(form.value).pipe(delay(1000)).subscribe()) {
          this.serviceNotification.showSuccess("You are in!", "Success");
          console.debug("Signup", form.value);
          this.closeSignUpModal(this.modalId);
        }
      }, error => {
        if (error.status === 422) {
          this.userAlreadyExists = true;
        }
        else
          this.serviceNotification.showError("Error to sign up. Try again later.", "Error");

        console.debug("Error to sign up. Try again later.", error);
      });
    }
    else {
      Object.keys(form.controls).forEach(key => {
        form.controls[key].markAsDirty();
      });
    }
  }

  openSignUpModal(modalId: string) {
    this.modalService.open(modalId);
  }

  closeSignUpModal(modalId: string) {
    this.modalService.close(modalId);
  }

}
