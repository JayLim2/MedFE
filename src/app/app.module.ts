import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RestService} from "../services/rest.service";
import {CreateTicketFormComponent} from './components/create-ticket-form/create-ticket-form.component';
import {HelpComponent} from './components/help/help.component';
import {ProfileComponent} from './components/profile/profile.component';
import {DataFieldComponent} from './components/data-field/data-field.component';
import {RegisterComponent} from './components/register/register.component';
import {PopupComponent} from './components/popup/popup.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DoctorsCatalogComponent} from './components/doctors-catalog/doctors-catalog.component';
import {MedServicesCatalogComponent} from './components/med-services-catalog/med-services-catalog.component';
import {BasicAuthInterceptor} from "./helpers/basic-auth.interceptor";
import {ErrorInterceptor} from "./helpers/error.interceptor";
import {FakeBackendInterceptor} from "./helpers/fake-backend.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CreateTicketFormComponent,
    HelpComponent,
    ProfileComponent,
    DataFieldComponent,
    RegisterComponent,
    PopupComponent,
    DoctorsCatalogComponent,
    MedServicesCatalogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    RestService,
    {provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
