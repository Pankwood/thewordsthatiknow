import { Component } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { AuthService } from './../../services/auth.service';
import { Router } from "@angular/router";
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  invalidLogin: boolean = false;
  modalId: string;
  constructor(private modalService: ModalService, private authService: AuthService, private router: Router, private serviceNotification: NotificationService) {
    this.modalId = modalService.modalLoginID;
  }

  login(credentials: any) {
    this.authService.login(credentials)
      .subscribe(result => {
        console.debug(result);
        if (result)
          this.router.navigate(['/']);
        else
          this.invalidLogin = true;
      }, error => {
        this.invalidLogin = true;
        this.serviceNotification.showError("Error to login. Try again later.", "Error");
        console.debug("Error login", error);
      });

    this.closeLoginModal(this.modalId);
  }

  openLoginModal(modalId: string) {
    this.modalService.open(modalId);
  }

  closeLoginModal(modalId: string) {
    this.modalService.close(modalId);
  }

}
