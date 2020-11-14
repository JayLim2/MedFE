import {Component, OnInit} from '@angular/core';
import {Router, UrlTree} from "@angular/router";
import {DoctorsService} from "../../../services/doctors.service";
import {Doctor} from "../../models/doctor.model";

@Component({
  selector: 'app-doctors-catalog',
  templateUrl: './doctors-catalog.component.html',
  styleUrls: ['./doctors-catalog.component.less']
})
export class DoctorsCatalogComponent implements OnInit {

  private _doctorsModel: Doctor[];

  constructor(
    private router: Router,
    private doctorsService: DoctorsService
  ) {
  }

  get doctorsModel(): Doctor[] {
    return this._doctorsModel;
  }

  ngOnInit(): void {
    this.doctorsService.getAll()
      .subscribe((data) => {
        this._doctorsModel = data;
      }, (error) => {
        console.error(error);
      })
  }

  onCreatePatientTicket(doctorId: number) {
    this.router.navigate(['tickets/create'], {
      queryParams: {
        doctorId: doctorId
      }
    });
  }

}
