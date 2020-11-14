import {User} from "./user.model";

export class Patient {
  id: number;
  registrationAddress: string;
  birthday: string;
  user: User;
  insurancePolicyNumber: string;
}
