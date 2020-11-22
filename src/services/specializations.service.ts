import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";
import {Observable} from "rxjs";
import {Specialization} from "../app/models/doctor.model";

@Injectable({
  providedIn: 'root'
})
export class SpecializationsService {

  private commonUrl: string = `api/doctorSpecializations`;

  constructor(
    private restService: RestService
  ) { }

  getAll(): Observable<Specialization[]> {
    return this.restService.get(`${this.commonUrl}/get/all`);
  }

  getAllAvailable(): Observable<Specialization[]> {
    return this.restService.get(`${this.commonUrl}/get/allAvailable`);
  }

}
