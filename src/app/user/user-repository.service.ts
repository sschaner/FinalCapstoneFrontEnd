import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserRepositoryService {
  constructor(private http: HttpClient) {}

  private apiUri = 'https://capstoneprojectapiservice.azure-api.net/api/User';
  private _currentUser: BehaviorSubject<IUser> | any = new BehaviorSubject(null);
  

  saveNewUser(user: IUser) {
    console.log("called save new user method in repository service");
    console.log(user);
    return this.http.post(this.apiUri, user).subscribe();
  }

  getCurrentUser(): Observable<IUser>{
    return this._currentUser.asObservable();
  }

  setCurrentUser(user: IUser){
    this._currentUser.next(user);
  }
}
