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

  openSignUpModal(id: string) {
    console.log(id);
    this.modalService.open(id);
  }

  closeSignUpModal(id: string) {
    console.log(id);
    this.modalService.close(id);
  }

}
