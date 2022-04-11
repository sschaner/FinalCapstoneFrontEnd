import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { BehaviorSubject, Observable } from 'rxjs';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserRepositoryService {
  tempUser: IUser = {
    userId: -1,
    firstName: '',
    lastName: '',
    email: '',
  };

  constructor(private http: HttpClient, private router: Router) {}

  private apiUri = 'https://capstoneprojectapiservice.azure-api.net/api/User';
  private emptyUser: IUser = {
    firstName: '',
    lastName: '',
    email: '',
    userId: -1,
  };
  private _currentUser: BehaviorSubject<IUser> | any = new BehaviorSubject(
    this.emptyUser
  );
  private user: any;

  saveNewUser(user: IUser) {
    console.log('called save new user method in repository service');
    console.log(user);
    return this.http.post(this.apiUri, user).subscribe();
  }

  loginUser(email: string) {
    this.returnUserByEmail(email).subscribe((response) => {
      this.user = response;
      // console.log(this.user);
      // console.log('current user: ', this.user);
      this.tempUser.userId = this.user.userId;
      this.tempUser.firstName = this.user.firstName;
      this.tempUser.lastName = this.user.lastName;
      this.tempUser.email = this.user.email;
    });

    console.log(this.tempUser);
    this.setCurrentUser(this.tempUser);
  }

  returnUserByEmail(email: string) {
    console.log(email);
    console.log('called return user by email method');
    console.log('URI used:', `${this.apiUri}?searchTerm=${email}`);
    console.log(this.http.get<any>(`${this.apiUri}?searchTerm=${email}`));
    return this.http.get<any>(`${this.apiUri}?searchTerm=${email}`);
    //return this.http.get("https://finalcapstonebackend20220406191528.azurewebsites.net/api/user?searchTerm=test").subscribe()
  }

  getCurrentUser(): Observable<IUser> {
    console.log(this._currentUser.asObservable());
    if (this._currentUser.asObservable == undefined) {
      let emptyUser: IUser = {
        firstName: '',
        lastName: '',
        email: '',
        userId: -1,
      };
      this.setCurrentUser(emptyUser);
    }
    return this._currentUser.asObservable();
  }

  setCurrentUser(user: IUser) {
    console.log('called set current user in user repo service');
    console.log(user);
    this._currentUser.next(user);
  }
}
