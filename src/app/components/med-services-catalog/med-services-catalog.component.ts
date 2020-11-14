import { Component, OnInit } from '@angular/core';
import {MedService} from "../../models/med-service.model";
import {MedServicesService} from "../../../services/med-services.service";
import {Doctor} from "../../models/doctor.model";

@Component({
  selector: 'app-med-services-catalog',
  templateUrl: './med-services-catalog.component.html',
  styleUrls: ['./med-services-catalog.component.less']
})
export class MedServicesCatalogComponent implements OnInit {

  private _medServicesList: MedService[];

  constructor(
    private medServicesService: MedServicesService
  ) { }

  get medServicesList(): MedService[] {
    return this._medServicesList;
  }

  ngOnInit(): void {
    this.medServicesService.getAll()
      .subscribe((data) => {
        this._medServicesList = data;
      }, (error) => {
        console.error(error);
      })
  }

  onShowDoctorsForMedService(medServiceName: string) {
    alert("Coming soon for: " + medServiceName);
  }

  getDoctorsByMedService(medServiceName: string): any[] {
    if(medServiceName === "Какая-то услуга") {
      return [{
        name: "Лечилов Иван Григорьевич",
        specialization: "Врач общей практики",
        cabinet: "1408"
      }]
    } else {
      return [{
        name: "Кирпиченко Цемент Стамесович",
        specialization: "Терапевт/Кардиолог",
        cabinet: "105"
      }]
    }
  }

}
