import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";
import {Doctor} from "../app/models/doctor.model";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  private commonUrl: string = "api/patientTickets"

  constructor(
    private restService: RestService
  ) { }

  getAvailableDates(doctor: Doctor): Observable<any> {
    if(true) return of([new Date()]);
    return this.restService.get(`${this.commonUrl}/getAvailableDates/${doctor.id}`);
  }

  dateToString(date: Date): string {
    return date ? date.toISOString().slice(0, 16) : null;
  }

}
