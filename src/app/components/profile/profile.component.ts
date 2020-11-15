import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {CustomButton} from "../popup/popup.component";
import {PatientTicketsService} from "../../../services/patient-tickets.service";
import {PatientTicket} from "../../models/patient-ticket.model";
import {User} from "../../models/user.model";
import {Role} from "../../models/role.model";
import {Patient} from "../../models/patient.model";
import {Doctor} from "../../models/doctor.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  /* TODO Сделать не ручные флаги! */

  public currentUser: User;
  public currentPatient: Patient;
  public currentDoctor: Doctor;

  public selectedTab: string = 'main';

  public supportChatButton: CustomButton = {
    title: "Отправить сообщение",
    onClick: () => {
      alert("Сообщение отправлено в службу поддержки.");
    }
  }

  public savePrescriptionButton: CustomButton = {
    title: "Добавить назначения",
    onClick: () => {
      alert("Назначения сохранены.");
    }
  }

  private _patientTicketsList: PatientTicket[];

  constructor(
    public authenticationService: AuthenticationService,
    private patientTicketsService: PatientTicketsService
  ) {
  }

  get patientTicketsList(): PatientTicket[] {
    return this._patientTicketsList;
  }

  ngOnInit(): void {
    this.selectedTab = localStorage.getItem("selectedTab");
    this.patientTicketsService.getByUser(null)
      .subscribe((tickets) => {
        this._patientTicketsList = tickets;
      }, (error) => {
        console.error(error);
      });
    this.currentUser = Math.random() > 0.5 ? new User(
      "8-800-555-77-99",
      null,
      "terminator_____000077777___huy@example.com",
      Role.PATIENT,
      "Сергей",
      "Комаров",
      "Геннадьевич"
    ) : new User(
      "8-800-555-35-35",
      null,
      "sexotron777@example.com",
      Role.DOCTOR,
      "Иван",
      "Лечилов",
      "Денисович"
    );
    if(this.currentUser.role === 'PATIENT') {
      let patient: Patient = new Patient();
      patient.id = 1502340;
      patient.user = this.currentUser;
      patient.insurancePolicyNumber = "000000011111122222";
      patient.birthday = "18.02.1998";
      patient.registrationAddress = "г. Самара, ул. Авроры, д.122, кв.342";

      this.currentPatient = patient;
    }
    if(this.currentUser.role === 'DOCTOR') {
      this.currentDoctor = {
        id: 1,
        user: this.currentUser,
        specialization: {
          name: "Врач общей практики"
        },
        cabinet: {
          name: "A101"
        },
        isWorkingNow: true
      };
    }
  }

  onTabClick(tab: string): void {
    this.selectedTab = tab;
    localStorage.setItem("selectedTab", tab);
  }

}
