import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Doctor} from "../app/models/doctor.model";
import {RestService} from "./rest.service";

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  private commonUrl: string = `api/doctors`;

  constructor(
    private restService: RestService
  ) { }

  public getAll(): Observable<Doctor[]> {
    return this.restService.get(`${this.commonUrl}/get/all`);
  }

  public getBySpecialization(specializationName: string): Observable<Doctor[]> {
    return this.restService.get(`${this.commonUrl}/get/spec/${specializationName}`);
  }

  public getByMedService(medServiceName: string): Observable<Doctor[]> {
    return this.restService.get(`${this.commonUrl}/get/medService/${medServiceName}`)
  }

}
