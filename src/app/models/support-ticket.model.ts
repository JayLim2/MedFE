import {User} from "./user.model";
import {Message} from "./message.model";
import {PatientTicket} from "./patient-ticket.model";

export class SupportTicket {
  id: number;
  patientTicket: PatientTicket;
  assignee: User;
  messages: Message[] = [];
}
