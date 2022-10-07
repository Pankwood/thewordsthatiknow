import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { getCurrentYear } from 'src/utils';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentYear: number = getCurrentYear();
  //gitVersion = environment.ANGULAR_APP_VERCEL_GIT_COMMIT_SHA.substring(0, 6);
  //vercelEnv = environment.ANGULAR_APP_VERCEL_ENV;
  environmentName = environment.NAME;

  constructor() { }

  ngOnInit(): void {
  }

}
