import {PatientTicket} from "./PatientTicket";
import {User} from "./User";
import {Message} from "./Message";

export class SupportTicket {
  id: number;
  patientTicket: PatientTicket;
  assignee: User;
  messages: Message[] = [];
}
