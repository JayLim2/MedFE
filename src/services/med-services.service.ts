import {Injectable} from '@angular/core';
import {RestService} from "./rest.service";
import {Observable, of} from "rxjs";
import {MedService} from "../app/models/med-service.model";

@Injectable({
  providedIn: 'root'
})
export class MedServicesService {

  constructor(
    private restService: RestService
  ) {
  }

  public getAll(): Observable<MedService[]> {
    return this.restService.get("/api/medServices/get/all");
  }

}
