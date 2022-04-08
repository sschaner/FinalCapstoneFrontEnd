import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserRepositoryService } from '../user-repository.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  constructor(private userService: UserRepositoryService, private router: Router) {}

  ngOnInit(): void {}

  saveNewUser(form: NgForm) {
    let user = form.form.value;

    this.userService.saveNewUser(user);
    console.log("called save new user method");
    console.log(user);
    this.userService.saveNewUser(user);
   this.userService.setCurrentUser(user);

    this.router.navigate(['/trail-search']);
  }
}
