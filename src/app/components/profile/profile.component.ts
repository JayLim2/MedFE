import {Component, OnChanges, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {CustomButton} from "../popup/popup.component";
import {PatientTicketsService} from "../../../services/patient-tickets.service";
import {PatientTicket} from "../../models/patient-ticket.model";
import {Role} from "../../models/role.model";
import {Patient} from "../../models/patient.model";
import {Doctor} from "../../models/doctor.model";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  /* TODO Сделать не ручные флаги! */

  public currentUser: any;
  private _patientTicketsList: PatientTicket[];
  public selectedTab: string = 'main';
  public savePrescriptionButton: CustomButton = {
    title: "Добавить назначения",
    onClick: () => {
      alert("Назначения сохранены.");
    }
  }

  constructor(
    public authenticationService: AuthenticationService,
    private patientTicketsService: PatientTicketsService
  ) {
  }

  get patientTicketsList(): PatientTicket[] {
    return this._patientTicketsList;
  }

  ngOnInit(): void {
    let savedTab = localStorage.getItem("selectedTab");
    if (savedTab) {
      this.selectedTab = savedTab;
    }

    this.authenticationService.currentUser
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

}
