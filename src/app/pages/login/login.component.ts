import { Component } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { AuthService } from './../../services/auth.service';
import { Router } from "@angular/router";
import { NotificationService } from 'src/app/services/notification.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  correctCredentials: boolean = true;
  modalId: string;
  constructor(private modalService: ModalService, private authService: AuthService, private router: Router, private serviceNotification: NotificationService) {
    this.modalId = modalService.modalLoginID;
  }

  login(form: any) {
    if (form.valid) {
      const credentials = form.value;
      this.authService.login(credentials)
        .subscribe(result => {
          if (result) {
            //this.router.navigate(['/']);
            this.closeLoginModal(this.modalId);
            this.correctCredentials = true;
          }
          else {
            this.correctCredentials = false;
          }
        }, error => {
          if (error.status === 404 || error.status === 401) {
            this.correctCredentials = false;
          }
          else
            this.serviceNotification.showError("Error to login. Try again later.", "Error");
          this.authService.logout();
          console.debug("Error login", error);
        });
    }
    else {
      Object.keys(form.controls).forEach(key => {
        form.controls[key].markAsDirty();
      });
    }
  }

  openLoginModal(modalId: string) {
    this.modalService.open(modalId);
  }

  closeLoginModal(modalId: string) {
    this.modalService.close(modalId);
  }

}
