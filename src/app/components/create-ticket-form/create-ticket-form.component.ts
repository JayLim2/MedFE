import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SpecializationsService} from "../../../services/specializations.service";
import {Doctor, Specialization} from "../../models/doctor.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DoctorsService} from "../../../services/doctors.service";
import {NgxSpinnerService} from "ngx-spinner";
import {DateTimeService} from "../../../services/date-time.service";
import {AuthenticationService} from "../../../services/authentication.service";
import {PatientTicketsService} from "../../../services/patient-tickets.service";
import {IDatePickerConfig} from "ng2-date-picker";
import {Moment} from "moment";
import {Router} from "@angular/router";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-create-ticket-form',
  templateUrl: './create-ticket-form.component.html',
  styleUrls: ['./create-ticket-form.component.less']
})
export class CreateTicketFormComponent implements OnInit {

  public selectedDate: any;
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

  private _defaultSpecialization = "Любая";

  private _specializations: Specialization[] = [];
  private _doctors: Doctor[] = [];
  private _availableDates: Date[] = [];

  private _form: FormGroup;

  public loading: boolean = true;

  constructor(
    private specializationsService: SpecializationsService,
    private doctorsService: DoctorsService,
    private cdr: ChangeDetectorRef,
    private overlayService: NgxSpinnerService,
    private dateTimeService: DateTimeService,
    private authenticationService: AuthenticationService,
    private patientTicketsService: PatientTicketsService,
    private router: Router,
    private ns: NotificationService
  ) {
  }

  get defaultSpecialization(): string {
    return this._defaultSpecialization;
  }

  get specializations(): Specialization[] {
    return this._specializations;
  }

  get doctors(): Doctor[] {
    return this._doctors;
  }

  get form(): FormGroup {
    return this._form;
  }

  ngOnInit(): void {
    this.overlayService.show();

    this._form = new FormGroup({
      specialization: new FormControl(this.defaultSpecialization, Validators.required),
      doctor: new FormControl(null, Validators.required),
      dateTime: new FormControl(null, Validators.required),
    })

    this.specializationsService.getAll()
      .subscribe((list: Specialization[] = []) => {
        this._specializations = [
          {name: this.defaultSpecialization},
          ...list
        ];
      }, (error) => {
        console.error(error);
      });

    this.doctorsService.getAll()
      .subscribe((list: Doctor[] = []) => {
        this.setDoctors(list);
      }, (error) => {
        console.error(error);
      });
  }

  onSelectSpecialization(event) {
    this.overlayService.show();

    let selectedSpecialization = event.target.value;

    this.form.get("specialization").setValue(
      selectedSpecialization,
      {onlySelf: true}
    );

    //load doctors by specialization
    let doctorsObservable = selectedSpecialization === 'Любая' ?
      this.doctorsService.getAll() :
      this.doctorsService.getBySpecialization(selectedSpecialization);
    doctorsObservable.subscribe((list: Doctor[] = []) => {
      this.setDoctors(list);
    }, (error) => {
      console.error(error);
    });
  }

  onSelectDoctor(event) {
    this.form.get("doctor").setValue(
      event.target.value,
      {onlySelf: true}
    );
  }

  onCreateTicket() {
    const value = this.form.value;
    let patientTicket = {
      doctor: {
        id: +value.doctor
      },
      patient: {
        id: this.authenticationService.currentUserValue.id
      },
      dateTime: value.dateTime
    }
    this.patientTicketsService.save(patientTicket)
      .subscribe((saved) => {
        this.router.navigateByUrl('profile');
      }, (error) => {
        this.ns.error("Ошибка при записи на прием к врачу. Проверьте введенные данные.");
      })
  }

  private setDoctors(list: Doctor[] = []) {
    this._doctors = list;
    if (list.length > 0) {
      this.form.get("doctor").setValue(list[0].id);
      //update available dates by doctor
      this.dateTimeService.getAvailableDates(list[0], new Date())
        .subscribe((list: Date[] = []) => {
          this.setDates(list);
        }, (error) => {
          console.error(error);
        })
    }
  }

  private setDates(list: any[] = []) {
    list = list.map(dateStr => this.dateTimeService.stringToDate(dateStr));
    this._availableDates = list.map(dateStr => this.dateTimeService.stringToDate(dateStr));
    if (list.length > 0) {
      const firstDate = this.dateTimeService.dateToString(list[0], "dd.MM.yyyy HH:mm");
      this.form.get("dateTime").setValue(firstDate);
    }
    this.cdr.detectChanges();
    this.overlayService.hide();
  }

}
