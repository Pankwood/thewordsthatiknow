import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  modalId: string;
  constructor(private modalService: ModalService) {
    this.modalId = modalService.modalLoginID;
  }

  openLoginModal(modalId: string) {
    this.modalService.open(modalId);
  }

  closeLoginModal(modalId: string) {
    this.modalService.close(modalId);
  }

}
