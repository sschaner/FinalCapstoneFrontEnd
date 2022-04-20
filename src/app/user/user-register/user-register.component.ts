import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserRepositoryService } from '../user-repository.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
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
    private router: Router,
    private formBuilder: RxFormBuilder
  ) { }

  userFormGroup: FormGroup;
  user: User;
  newUser: any;
  errorObject = {}
  currentUser: IUser;
  successMessage = '';
  failureMessage = '';
  tempUser: IUser | any = {};
  makeNewUser: boolean;

  ngOnInit(): void {
    this.user = new User();
    this.userFormGroup = this.formBuilder.formGroup(this.user);
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

  async onSubmit() {
    this.failureMessage = '';
    this.successMessage = '';
    this.tempUser = {}

    this.tempUser = await this.userService.returnUserByEmail(this.userFormGroup.value.email).toPromise();

    if (this.tempUser === null || this.tempUser === undefined) {
      this.makeNewUser = true;
    } else {
      this.makeNewUser = false;
    }

    if (this.makeNewUser === true) {
      let user = this.userFormGroup.value;
      console.log("user being created:", user);
      this.userService.saveNewUser(user);
      this.successMessage =
        "Success! Thanks for joining the Sunny-Trails Community. Sign in above to continue.";

    } else {
      console.log('triggered final else statement in onsubmit method')
      this.failureMessage = 'Sorry, looks like there is already a user with that email. Try another to get started!';
    }

  }
}
