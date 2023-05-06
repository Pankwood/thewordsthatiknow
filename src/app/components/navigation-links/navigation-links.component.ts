import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'ul[app-navigation-links]',
  templateUrl: './navigation-links.component.html',
  styleUrls: ['./navigation-links.component.scss']
})
export class NavigationLinksComponent {
  constructor(private modalService: ModalService, public authService: AuthService) { }

  openLoginModal() {
    this.modalService.open(this.modalService.modalLoginID);
  }

  openSignUpModal() {
    this.modalService.open(this.modalService.modalSignUpID);
  }

  getFirstName() {
    if (!this.authService?.currentUser?.fullName)
      return "";
    let fullName = this.authService.currentUser.fullName;
    return "Welcome " + fullName.substring(0, fullName.indexOf(' ')) + "!";
  }

}
