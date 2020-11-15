import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {CreateTicketFormComponent} from "./components/create-ticket-form/create-ticket-form.component";
import {HelpComponent} from "./components/help/help.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {RegisterComponent} from "./components/register/register.component";
import {DoctorsCatalogComponent} from "./components/doctors-catalog/doctors-catalog.component";
import {MedServicesCatalogComponent} from "./components/med-services-catalog/med-services-catalog.component";
import {AuthGuard} from "./helpers/auth.guard";


const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'tickets/create', component: CreateTicketFormComponent, canActivate: [AuthGuard]},
  {path: 'help', component: HelpComponent},
  {path: 'catalog/doctors', component: DoctorsCatalogComponent},
  {path: 'catalog/medServices', component: MedServicesCatalogComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
