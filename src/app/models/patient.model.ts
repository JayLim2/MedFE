import {User} from "./user.model";
import {Role} from "./role.model";

export class Patient extends User {
  registrationAddress: string;
  birthday: string;
  insurancePolicyNumber: string;


  constructor(phone: string, password: string, email: string, role: Role, firstName: string, lastName: string, middleName: string,
              registrationAddress: string, birthday: string, insurancePolicyNumber: string) {

    super(phone, password, email, role, firstName, lastName, middleName);
    this.registrationAddress = registrationAddress;
    this.birthday = birthday;
    this.insurancePolicyNumber = insurancePolicyNumber;
  }
}
