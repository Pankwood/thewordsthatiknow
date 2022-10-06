import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { getCurrentYear } from 'src/utils';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentYear: number = getCurrentYear();
  gitVersion = environment.VERCEL_GIT_COMMIT_SHA.substring(0, 6);
  vercelEnv = environment.VERCEL_ENV;

  constructor() { }

  ngOnInit(): void {
  }

}
