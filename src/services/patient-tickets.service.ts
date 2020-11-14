import { Injectable } from '@angular/core';
import {User} from "../app/models/user.model";
import {Observable, of} from "rxjs";
import {PatientTicket} from "../app/models/patient-ticket.model";
import {RestService} from "./rest.service";
import {Role} from "../app/models/role.model";
import {Doctor} from "../app/models/doctor.model";
import {Patient} from "../app/models/patient.model";

@Injectable({
  providedIn: 'root'
})
export class PatientTicketsService {

  constructor(
    private restService: RestService
  ) { }

  public getAll(): Observable<PatientTicket[]> {
    if(true) return of([]);
    return this.restService.get("api/patient/allTickets");
  }

  public getByUser(user: User): Observable<PatientTicket[]> {
    if(true) {
      let patientUser: User = new User(
        "8-800-555-77-99",
        "terminator_____000077777___huy@example.com",
        Role.PATIENT,
        "Сергей",
        "Комаров",
        "Геннадьевич"
      );
      let patient: Patient = new Patient();
      patient.id = 1502340;
      patient.user = patientUser;
      patient.insurancePolicyNumber = "000000011111122222";
      patient.birthday = "18.02.1998";
      patient.registrationAddress = "г. Самара, ул. Авроры, д.122, кв.342";

      let doctorUser: User = new User(
        "8-800-555-35-35",
        "sexotron777@example.com",
        Role.DOCTOR,
        "Иван",
        "Лечилов",
        "Денисович"
      );
      let doctor: Doctor = {
        id: 1,
        user: doctorUser,
        specialization: {
          name: "Врач общей практики"
        },
        cabinet: {
          name: "A101"
        },
        isWorkingNow: true
      };

      let ticket = new PatientTicket();
      ticket.id = 43219423942384;
      ticket.datetime = "12.02.2019 10:15";
      ticket.patient = patient;
      ticket.doctor = doctor;
      ticket.prescriptions = "bla bla bla";

      return of([ticket]);
    }
    return this.restService.get(`api/patient/tickets/${user.phone}`);
  }

}
