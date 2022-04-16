import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserRepositoryService } from '../user-repository.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { User } from 'src/app/classes/UserClass';
import { IUser } from 'src/app/interfaces/IUser';
import { waitForAsync } from '@angular/core/testing';



@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  
  constructor(private userService: UserRepositoryService, private router: Router, private formBuilder: RxFormBuilder) {}

  ngOnInit(): void {
    this.user = new User;
    this.userFormGroup = this.formBuilder.formGroup(this.user)
  }

  userFormGroup: FormGroup;
  user: User;
  errorObject = {}
  currentUser: IUser;
  private tempUser: IUser = {
    userId: -1,
    firstName: '',
    lastName: '',
    email: '',
  };
  successMessage = '';



   saveNewUser(form: NgForm) {
    let user = form.form.value;
    console.log(user)
    this.userService.saveNewUser(user);
    //this.userService.saveNewUser(user);
    this.userService.setCurrentUser(user);

   // this.router.navigate(['/trail-search']);
  } 

  onSubmit() {
    console.log('Valid?', this.userFormGroup.valid); // true or false
    console.log('Email', this.userFormGroup.value.email);
    console.log('first name', this.userFormGroup.value.firstName);
    console.log('last name', this.userFormGroup.value.lastName);
    let user = this.userFormGroup.value;
    console.log("user:", user);
    this.userService.saveNewUser(user);
    console.log(user.email)
    this.successMessage =
      "Success! Thanks for joining the Sunny-Trails Community. Sign in above to coninute.";
    //this.userService.loginUser(user.email);

    
   /*  this.userService.returnUserByEmail(user.email).subscribe((value) => {
      this.currentUser = value;
      this.tempUser.userId = this.currentUser.userId;
      this.tempUser.firstName = this.currentUser.firstName;
      this.tempUser.lastName = this.currentUser.lastName;
      this.tempUser.email = this.currentUser.email;
    }); */
    //this.userService.setCurrentUser(this.tempUser);
    
    //console.log('temp user:', this.tempUser)
    
    //this.userService.setCurrentUser(this.tempUser);
    //this.router.navigate(['/trail-search']);
  }
}
