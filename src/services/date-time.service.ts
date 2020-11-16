import {Injectable} from '@angular/core';
import {RestService} from "./rest.service";
import {Doctor} from "../app/models/doctor.model";
import {Observable, of} from "rxjs";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  private pattern = "dd.MM.yyyy'T'HH:mm";

  private commonUrl: string = "api/patientTickets"

  constructor(
    private restService: RestService,
    private datePipe: DatePipe
  ) {
  }

  getAvailableDates(doctor: Doctor, selectedDate: Date): Observable<any> {
    return this.restService.get(
      `${this.commonUrl}/get/doctor/date/${doctor.id}`,
      {params: {date: this.dateToString(selectedDate, this.pattern)}}
    );
  }

  dateToString(date: Date, pattern?: string): string {
    if (!pattern) {
      return date ? date.toISOString().slice(0, 16) : null;
    }
    return this.datePipe.transform(date, pattern);
  }

  stringToDate(date: string, pattern?: string): Date {
    if (!pattern) {
      return new Date(date);
    }
    return new Date(date);
  }

}
