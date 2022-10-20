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

  openLoginModal(id: string) {
    this.modalService.open(id);
  }

  closeLoginModal(id: string) {
    this.modalService.close(id);
  }

}
