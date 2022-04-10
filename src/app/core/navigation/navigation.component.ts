import { Component, OnInit } from '@angular/core';
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
  constructor(private userService: UserRepositoryService, private router: Router) {}


  ngOnInit(): void {}

  logout() {
    console.log('called logout method in navigation')
    let emptyUser: IUser = {
      firstName: '',
      lastName: '',
      email: '',
      userId: -1
    }
    this.userService.setCurrentUser(emptyUser);
    console.log(this.userService.getCurrentUser())
    this.router.navigate(['/home']);
  }

  login(form: NgForm){
    console.log('called login method in nav component')
    let email = form.form.value.email;
    console.log('email variable:', email)
    this.userService.loginUser(email);
    this.router.navigate(['/trail-search']);

  }
}
