import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-burguer',
  templateUrl: './burguer.component.html',
  styleUrls: ['./burguer.component.scss']
})
export class BurguerComponent {

  @Output() getValue: EventEmitter<boolean> = new EventEmitter();

  @Input() isOpen: boolean = false;

  toggle() {
    this.isOpen = !this.isOpen;
    this.getValue.emit(this.isOpen);
  }

}
