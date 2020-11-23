import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DoctorsService} from "../../../services/doctors.service";
import {Doctor} from "../../models/doctor.model";
import {NgxSpinnerService} from "ngx-spinner";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-doctors-catalog',
  templateUrl: './doctors-catalog.component.html',
  styleUrls: ['./doctors-catalog.component.less']
})
export class DoctorsCatalogComponent implements OnInit {

  private _doctorsModel: Doctor[] = [];

  public isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private doctorsService: DoctorsService,
    private overlayService: NgxSpinnerService,
    private authenticationService: AuthenticationService
  ) {
  }

  get doctorsModel(): Doctor[] {
    return this._doctorsModel;
  }

  ngOnInit(): void {
    this.overlayService.show();
    this.authenticationService.currentUserObservable
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      });

    this.doctorsService.getAll()
      .subscribe((data) => {
        this._doctorsModel = data;
      }, (error) => {
        console.error(error);
      })
      .add(() => {
        this.overlayService.hide();
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
