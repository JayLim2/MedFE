import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RestService} from "../services/rest.service";
import {CreateTicketFormComponent} from './components/create-ticket-form/create-ticket-form.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { TicketPageComponent } from './components/ticket-page/ticket-page.component';
import { HelpComponent } from './components/help/help.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LogoutComponent } from './components/logout/logout.component';
import { DataFieldComponent } from './components/data-field/data-field.component';
import { RegisterComponent } from './components/register/register.component';
import { PopupComponent } from './components/popup/popup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChatComponent } from './components/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CreateTicketFormComponent,
    TicketsComponent,
    TicketPageComponent,
    HelpComponent,
    ProfileComponent,
    LogoutComponent,
    DataFieldComponent,
    RegisterComponent,
    PopupComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
