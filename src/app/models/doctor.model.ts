import {User} from "./user.model";

export class Doctor extends User {
  specialization: Specialization;
  cabinet: Cabinet;
  isWorkingNow: boolean;
}

export class Specialization {
  name: string;
}

export class Cabinet {
  name: string;
  specialization?: string;
  doctorsCount?: number;
}
