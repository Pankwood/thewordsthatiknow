import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private modalService: ModalService) { }

  openLoginModal() {
    this.modalService.open(this.modalService.modalLoginID);
  }

  openSignUpModal() {
    this.modalService.open(this.modalService.modalSignUpID);
  }
}
