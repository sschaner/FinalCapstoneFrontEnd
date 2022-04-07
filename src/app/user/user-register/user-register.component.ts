import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserRepositoryService } from '../user-repository.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  constructor(private userService: UserRepositoryService) {}

  ngOnInit(): void {}

  saveNewUser(form: NgForm) {
    let upMeet = form.form.value;

    this.userService.saveNewUser(upMeet);
  }
}
