import {Injectable} from '@angular/core';
import {RestService} from "./rest.service";
import {Observable, of} from "rxjs";
import {MedService} from "../app/models/med-service.model";

@Injectable({
  providedIn: 'root'
})
export class MedServicesService {

  private commonUrl: string = "api/medicalServices";

  constructor(
    private restService: RestService
  ) {
  }

  public getAll(): Observable<MedService[]> {
    return this.restService.get(`${this.commonUrl}/get/all`);
  }

}
