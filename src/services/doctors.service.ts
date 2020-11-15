import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Doctor} from "../app/models/doctor.model";
import {RestService} from "./rest.service";

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  constructor(
    private restService: RestService
  ) { }

  public getAll(): Observable<Doctor[]> {
    return this.restService.get("/api/doctors/get/all");
  }

}
