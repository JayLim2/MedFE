import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";
import {Patient} from "../app/models/patient.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private commonUrl: string = `api/patients`;

  constructor(
    private restService: RestService
  ) { }

  public register(patient: Patient): Observable<any> {
    console.log(patient);
    return this.restService.put(`${this.commonUrl}/register`, patient);
  }

}
