import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  toastConfig = {
    positionClass: 'toast-bottom-right',
    preventDuplicates: true,
    countDuplicates: true,
    maxOpened: 3,
    autoDismiss: true,
  };

  showSuccess(message: string, title: string) {
    this.toastr.success(message, title, this.toastConfig)
  }

  showError(message: string, title: string) {
    this.toastr.error(message, title, this.toastConfig)
  }

  showInfo(message: string, title: string) {
    this.toastr.info(message, title, this.toastConfig)
  }

  showWarning(message: string, title: string) {
    this.toastr.warning(message, title, this.toastConfig)
  }

}
