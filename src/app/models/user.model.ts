import {Role} from "./role.model";

export class User {
  phone: string;
  email: string;
  role: Role;
  firstName: string;
  lastName: string;
  middleName?: string;


  constructor(phone: string, email: string, role: Role,
              firstName: string, lastName: string, middleName: string) {

    this.phone = phone;
    this.email = email;
    this.role = role;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
  }

  name(): string {
    return `${this.lastName} ${this.firstName} ${this.middleName}`;
  }

}
