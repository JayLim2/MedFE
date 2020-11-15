import {User} from "./user.model";

export class Patient extends User {
  registrationAddress: string;
  birthday: string;
  insurancePolicyNumber: string;
}
