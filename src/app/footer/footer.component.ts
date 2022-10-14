import { environment } from '../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { getCurrentYear } from 'src/utils';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentYear: number = getCurrentYear();
  environmentName = environment.NAME;

  constructor() { }

  ngOnInit(): void {
  }

}
