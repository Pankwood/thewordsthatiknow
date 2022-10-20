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
  ],
  providers: [
    WordsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
