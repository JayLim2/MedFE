import { Component, OnInit } from '@angular/core';
import {MedService} from "../../models/med-service.model";
import {MedServicesService} from "../../../services/med-services.service";
import {Doctor} from "../../models/doctor.model";
import {NgxSpinnerService} from "ngx-spinner";
import {DoctorsService} from "../../../services/doctors.service";

@Component({
  selector: 'app-med-services-catalog',
  templateUrl: './med-services-catalog.component.html',
  styleUrls: ['./med-services-catalog.component.less']
})
export class MedServicesCatalogComponent implements OnInit {

  private _medServicesList: MedService[] = [];
  public doctorsByMedService: Doctor[];

  constructor(
    private medServicesService: MedServicesService,
    private doctorsService: DoctorsService,
    private overlayService: NgxSpinnerService
  ) { }

  get medServicesList(): MedService[] {
    return this._medServicesList;
  }

  ngOnInit(): void {
    this.overlayService.show();
    this.medServicesService.getAll()
      .subscribe((data) => {
        this._medServicesList = data;
      }, (error) => {
        console.error(error);
      })
      .add(() => {
        this.overlayService.hide();
      })
  }

  getDoctorsByMedService(medServiceName: string) {
    this.overlayService.show();
    this.doctorsService.getByMedService(medServiceName)
      .subscribe((doctors: Doctor[]) => {
        this.doctorsByMedService = doctors;
      }, (error) => {
        console.error(error);
      })
      .add(() => {
        this.overlayService.hide();
      })
  }

  clearDoctorsByMedServiceName() {
    this.doctorsByMedService = null;
  }

}
