import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/IUser';
import { UserRepositoryService } from 'src/app/user/user-repository.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  currentUser: any | undefined;
  email: any | undefined;

  constructor(
    private userService: UserRepositoryService,
    private router: Router,
    private modalService: NgbModal
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

  async login(form: NgForm, content) {
    this.email = form.form.value.email;
    let tempUser = await this.userService
      .returnUserByEmail(this.email)
      .toPromise();

    if (tempUser === null || tempUser === undefined) {
      this.openSm(content);
    } else {
      this.userService.loginUser(this.email);
    }
  }

  openSm(content) {
    this.modalService.open(content, { size: 'sm' });
  }
}
