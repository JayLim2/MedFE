import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {CustomButton} from "../popup/popup.component";
import {PatientTicketsService} from "../../../services/patient-tickets.service";
import {PatientTicket} from "../../models/patient-ticket.model";
import {Role} from "../../models/role.model";
import {Patient} from "../../models/patient.model";
import {Doctor} from "../../models/doctor.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IDatePickerConfig} from "ng2-date-picker";
import {Moment} from "moment";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  /* TODO Сделать не ручные флаги! */

  private _prescriptionsForm: FormGroup;
  private _dateTimeForm: FormGroup;

  public currentUser: any;
  private _patientTicketsList: PatientTicket[];
  public selectedTab: string = 'main';
  public savePrescriptionButton: CustomButton = {
    title: "Добавить назначения",
    onClick: () => {
      alert("Назначения сохранены.");
    },
    disabled: this.prescriptionsForm?.invalid
  }

  public config: IDatePickerConfig = {
    format: "DD.MM.YYYY HH:mm",
    showTwentyFourHours: true,
    showSeconds: false,
    minutesInterval: 30,
    firstDayOfWeek: "mo"
  }
  public material: boolean = true;
  public placeholder: string = 'Выберите дату приема';
  public displayDate: Moment | string;

  constructor(
    public authenticationService: AuthenticationService,
    private patientTicketsService: PatientTicketsService
  ) {
    this._prescriptionsForm = new FormGroup({
      prescriptions: new FormControl(null, Validators.required)
    });
    this._dateTimeForm = new FormGroup({
      dateTime: new FormControl(null, Validators.required)
    })
  }

  get prescriptionsForm(): FormGroup {
    return this._prescriptionsForm;
  }

  get dateTimeForm(): FormGroup {
    return this._dateTimeForm;
  }

  get patientTicketsList(): PatientTicket[] {
    return this._patientTicketsList;
  }

  ngOnInit(): void {
    let savedTab = localStorage.getItem("selectedTab");
    if (savedTab) {
      this.selectedTab = savedTab;
    }

    this.authenticationService.currentUserObservable
      .subscribe((currentUser: any) => {
        if (currentUser) {
          this.currentUser = currentUser;
          switch (this.currentUser.role) {
            case Role.ROLE_PATIENT:
              this.patientTicketsService.getByPatient(this.currentUser as Patient)
                .subscribe((tickets) => {
                  this._patientTicketsList = tickets;
                }, (error) => {
                  console.error(error);
                });
              break;
            case Role.ROLE_DOCTOR:
              this.patientTicketsService.getByDoctor(this.currentUser as Doctor)
                .subscribe((tickets) => {
                  this._patientTicketsList = tickets;
                }, (error) => {
                  console.error(error);
                });
              break;
          }
        }
      })
  }

  onTabClick(tab: string): void {
    switch (tab) {
      case 'main':
      case 'tickets':
        this.selectedTab = tab;
        localStorage.setItem("selectedTab", tab);
    }
  }

  getCurrentUserName(): string {
    return `${this.currentUser.lastName} ${this.currentUser.firstName} ${this.currentUser.middleName ? this.currentUser.middleName : ''}`;
  }

  onSavePrescriptions(ticket: PatientTicket) {
    ticket.prescriptions = this.prescriptionsForm.value.prescriptions;
    this.patientTicketsService.save(ticket)
      .subscribe((isSaved) => {
        console.log(isSaved); // TODO notification for user
      }, (error) => {
        console.error(error);
      })
  }

  onSaveDateTime(ticket: PatientTicket) {
    ticket.datetime = this.prescriptionsForm.value.dateTime;
    this.patientTicketsService.save(ticket)
      .subscribe((isSaved) => {
        console.log(isSaved); // TODO notification for user
      }, (error) => {
        console.error(error);
      })
  }

  onCancelTicket(ticket: PatientTicket) {
    this.patientTicketsService.delete(ticket)
      .subscribe((isDeleted) => {
        console.log(isDeleted); // TODO notification for user
      }, (error) => {
        console.error(error);
      })
  }

}
