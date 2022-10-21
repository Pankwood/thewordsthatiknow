import { Component } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  modalId: string;
  constructor(private modalService: ModalService) {
    this.modalId = modalService.modalSignUpID;
  }

  openSignUpModal(modalId: string) {
    this.modalService.open(modalId);
  }

  closeSignUpModal(modalId: string) {
    this.modalService.close(modalId);
  }

}
