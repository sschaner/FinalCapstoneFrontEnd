import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserRepositoryService } from '../user-repository.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { User } from 'src/app/classes/UserClass';
import { IUser } from 'src/app/interfaces/IUser';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  constructor(
    private userService: UserRepositoryService,
    private formBuilder: FormBuilder
  ) {}

  userFormGroup: FormGroup;
  user: User;
  newUser: any;
  errorObject = {};
  currentUser: IUser;
  successMessage = '';
  failureMessage = '';
  tempUser: IUser | any = {};
  makeNewUser: boolean;

  validationMessages = {
    FirstName: [
      { type: 'required', message: 'First name is required.' },
      {
        type: 'maxlength',
        message: 'First name must be 100 characters or less.',
      },
    ],
    LastName: [
      { type: 'required', message: 'Last name is required.' },
      {
        type: 'maxlength',
        message: 'Last name must be 100 characters or less.',
      },
    ],
    Email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' },
    ],
  };

  ngOnInit(): void {
    this.user = new User();
    this.userFormGroup = this.formBuilder.group(this.user);
    this.createForm();
  }

  ngAfterViewInit() {
    document.querySelector('body').classList.add('bg-register');
    document.querySelector('nav').classList.add('gray');
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('bg-register');
    document.querySelector('nav').classList.remove('gray');
  }

  saveNewUser(form: NgForm) {
    let user = form.form.value;
    this.userService.saveNewUser(user);
    this.userService.setCurrentUser(user);
  }

  createForm() {
    this.userFormGroup = this.formBuilder.group({
      FirstName: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(100)]),
      ],
      LastName: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(100)]),
      ],
      Email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
    });
  }

  async onSubmitRegister(registerValue: any) {
    this.userService.saveNewUser(registerValue).subscribe();
    this.createForm();
    this.tempUser = {};

    this.tempUser = await this.userService
      .returnUserByEmail(this.userFormGroup.value.email)
      .toPromise();

    if (this.tempUser === null || this.tempUser === undefined) {
      this.makeNewUser = true;
    } else {
      this.makeNewUser = false;
    }

    if (this.makeNewUser === true) {
      let user = this.userFormGroup.value;
      console.log('user being created:', user);
      this.userService.saveNewUser(user);
      this.successMessage =
        'Success! Thanks for joining the Sunny-Trails Community. Sign in above to continue.';
    } else {
      console.log('triggered final else statement in onsubmit method');
      this.failureMessage =
        'Sorry, looks like there is already a user with that email. Try another to get started!';
    }
  }
}
