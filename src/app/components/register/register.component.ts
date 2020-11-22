import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {NotificationService} from "../../../services/notification.service";

interface PasswordValidationResult {
  passwordEmpty: boolean,
  passwordTooShort: boolean,
  passwordTooLong: boolean,
  passwordNotEqualVerifyPassword: boolean
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  private _registerForm: FormGroup;

  constructor(
    private ns: NotificationService
  ) {
    this._registerForm = new FormGroup({
      phone: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      verifyPassword: new FormControl(null, Validators.required),
      email: new FormControl(null),
      firstName: new FormControl(null, Validators.required),
      middleName: new FormControl(null),
      lastName: new FormControl(null, Validators.required),
      birthday: new FormControl(null, Validators.required),
      insurancePolicyNumber: new FormControl(null, Validators.required)
    }, this.passwordValidator.bind(this))
  }

  passwordValidator(control: FormGroup): ValidationErrors | null {
    const password = control.get('password').value;
    const verifyPassword = control.get('verifyPassword').value;

    let error = {
      passwordEmpty: false,
      passwordTooShort: false,
      passwordTooLong: false,
      passwordNotEqualVerifyPassword: false
    }

    error.passwordEmpty = !password || !verifyPassword;
    if (!error.passwordEmpty) {
      error.passwordTooShort = password.length < 6;
      error.passwordTooLong = password.length > 20;
      error.passwordNotEqualVerifyPassword = password !== verifyPassword;
    }

    let isError = error.passwordEmpty
      || error.passwordTooShort
      || error.passwordTooLong
      || error.passwordNotEqualVerifyPassword;

    return isError ? { passwordValidations: error } : null;
  };

  get registerForm(): FormGroup {
    return this._registerForm;
  }

  ngOnInit(): void {
  }

  onRegister() {
    this.ns.clear();

    if(this.registerForm.invalid) {
      if (this.registerForm.errors) {
        let passwordErrors: PasswordValidationResult = this.registerForm.errors.passwordValidations;
        if (passwordErrors) {
          let message = null;
          if(passwordErrors.passwordEmpty) {
            message = "Поля Пароль и Повторите пароль обязательны для заполнения.";
          } else if(passwordErrors.passwordTooShort) {
            message = "Пароль должен быть длиной не менее 6 символов.";
          } else if(passwordErrors.passwordTooLong) {
            message = "Пароль должен быть длиной не более 20 символов.";
          } else if (passwordErrors.passwordNotEqualVerifyPassword) {
            message = "Пароли не совпадают.";
          }
          if (message) {
            this.ns.error(message);
          }
        }
      }

      let phoneErrors = this.registerForm.get("phone").errors;
      let firstNameErrors = this.registerForm.get("firstName").errors;
      let lastNameErrors = this.registerForm.get("lastName").errors;
      let birthdayErrors = this.registerForm.get("birthday").errors;
      let insurancePolicyNumberErrors = this.registerForm.get("insurancePolicyNumber").errors;
      if (phoneErrors) {
        this.ifRequired(phoneErrors, "Мобильный телефон");
      }
      if (firstNameErrors) {
        this.ifRequired(firstNameErrors, "Имя");
      }
      if (lastNameErrors) {
        this.ifRequired(lastNameErrors, "Фамилия");
      }
      if (birthdayErrors) {
        this.ifRequired(birthdayErrors, "Дата рождения");
      }
      if (insurancePolicyNumberErrors) {
        this.ifRequired(insurancePolicyNumberErrors, "Полис ОМС");
      }
    } else { //ok
      this.ns.info("Регистрация завершена.");
    }
  }

  private ifRequired(errors: any, name: string) {
    let message = null;
    if (errors.required) {
      message = this.getRequiredMessage(name);
    }
    if (message) {
      this.ns.error(message);
    }
  }

  private getRequiredMessage(name: string): string {
    return `Поле ${name} обязательно для заполнения.`;
  }

}
