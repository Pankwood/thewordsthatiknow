import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { WordsService } from './services/words.service';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PageDefaultComponent } from './components/page-default/page-default.component';
import { ModalComponent } from './components/modal/modal.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { BurguerComponent } from './components/burguer/burguer.component';
import { NavigationLinksComponent } from './components/navigation-links/navigation-links.component';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    PageDefaultComponent,
    ModalComponent,
    LoginComponent,
    SignUpComponent,
    BurguerComponent,
    NavigationLinksComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      countDuplicates: true,
      maxOpened: 1,
      autoDismiss: true,
      resetTimeoutOnDuplicate: true,
      includeTitleDuplicates: true
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["example.com"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
  ],
  providers: [
    WordsService,
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
