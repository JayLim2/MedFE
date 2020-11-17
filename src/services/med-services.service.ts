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
    if(true) return of([
      {
        name: "Услуга 1",
        description: "Описание услуги 1",
        recommendations: "Рекомендации к услуги 1",
        isAvailable: true
      },
      {
        name: "Услуга 2",
        description: "Описание услуги 2",
        recommendations: "Рекомендации к услуги 2",
        isAvailable: false
      }
    ])
    return this.restService.get("api/medServices/get/all");
  }

}
