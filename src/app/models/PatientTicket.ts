import {User} from "./User";

export class PatientTicket {
  id: number;
  patient: User;
  doctor: User;
  datetime: string;
  prescriptions?: string;

  constructor() {
  }

}
