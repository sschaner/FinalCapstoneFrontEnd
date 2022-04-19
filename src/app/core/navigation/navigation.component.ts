import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/IUser';
import { UserRepositoryService } from 'src/app/user/user-repository.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  currentUser: any | undefined;
  val: boolean = true;

  constructor(
    private userService: UserRepositoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((value) => {
      this.currentUser = value;
    });
  }

  logout() {
    let emptyUser: IUser = {
      firstName: '',
      lastName: '',
      email: '',
      userId: -1,
    };
    this.userService.setCurrentUser(emptyUser);
    this.router.navigate(['/home']);
  }

  login(form: NgForm) {
    let email = form.form.value.email;
    this.userService.loginUser(email);
  }
}
