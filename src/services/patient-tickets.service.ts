import { Injectable } from '@angular/core';
import {User} from "../app/models/User";
import {Observable} from "rxjs";
import {PatientTicket} from "../app/models/PatientTicket";
import {RestService} from "./rest.service";

@Injectable({
  providedIn: 'root'
})
export class PatientTicketsService {

  constructor(
    private restService: RestService
  ) { }

  public getAll(): Observable<PatientTicket[]> {
    return this.restService.get("api/patient/allTickets");
  }

  public getByPatient(user: User): Observable<PatientTicket[]> {
    return this.restService.get(`api/patient/tickets/${user.login}`);
  }

}
