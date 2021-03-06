import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {PatientTicket} from "../app/models/patient-ticket.model";
import {RestService} from "./rest.service";
import {Patient} from "../app/models/patient.model";
import {Doctor} from "../app/models/doctor.model";

@Injectable({
  providedIn: 'root'
})
export class PatientTicketsService {

  private commonUrl: string = `api/patientTickets`;

  constructor(
    private restService: RestService
  ) {
  }

  public getByPatient(patient: Patient): Observable<PatientTicket[]> {
    return this.restService.get(`${this.commonUrl}/get/patient/${patient.id}`);
  }

  public getByDoctor(doctor: Doctor): Observable<PatientTicket[]> {
    return this.restService.get(`${this.commonUrl}/get/doctor/${doctor.id}`);
  }

  public getAll(): Observable<PatientTicket[]> {
    return this.restService.get(`${this.commonUrl}/get/all`);
  }

  public save(patientTicket: any): Observable<any> {
    return this.restService.put(`${this.commonUrl}/save`, patientTicket);
  }

  public delete(patientTicket: PatientTicket): Observable<any> {
    return this.restService.delete(`${this.commonUrl}/delete/${patientTicket.id}`);
  }

}
