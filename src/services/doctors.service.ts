import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {Doctor} from "../app/models/doctor.model";
import {RestService} from "./rest.service";
import {Role} from "../app/models/role.model";
import {User} from "../app/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  constructor(
    private restService: RestService
  ) { }

  public getAll(): Observable<Doctor[]> {
    if(true) {
      let doctors: Doctor[] = [];
      let user: User = new User(
        "8-800-555-35-35",
        "sexotron777@example.com",
        Role.DOCTOR,
        "Иван",
        "Лечилов",
        "Денисович"
      );

      let doctor: Doctor = {
        id: 1,
        user: user,
        specialization: {
          name: "Врач общей практики"
        },
        cabinet: {
          name: "A101"
        },
        isWorkingNow: true
      };
      doctors.push(doctor);
      return of(doctors);
    }
    return this.restService.get("/api/doctors/get/all");
  }

}
