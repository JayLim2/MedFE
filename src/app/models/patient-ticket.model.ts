import {Doctor} from "./doctor.model";
import {Patient} from "./patient.model";

export class PatientTicket {
  id: number;
  patient: Patient;
  doctor: Doctor;
  dateTime: string;
  prescriptions?: string;
}
