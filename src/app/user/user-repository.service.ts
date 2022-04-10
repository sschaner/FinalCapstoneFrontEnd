import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { BehaviorSubject, Observable } from 'rxjs';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserRepositoryService {
  constructor(private http: HttpClient, private router: Router) {}

  private apiUri = 'https://capstoneprojectapiservice.azure-api.net/api/User';
  private _currentUser: BehaviorSubject<IUser> | any = new BehaviorSubject(null);
    user: IUser | any = {
    firstName: "",
    lastName: "",
    email: "",
    userId: -1
  };
  

  saveNewUser(user: IUser) {
    console.log("called save new user method in repository service");
    console.log(user);
    return this.http.post(this.apiUri, user).subscribe();
  }

  loginUser(email: string){
    
   this.returnUserByEmail(email).subscribe((response) => {
      this.user = response;
    }); 
       
    console.log("current user: ", this.user)
    this.setCurrentUser(this.user);
    this.router.navigate(['/home']);
  }


  returnUserByEmail(email: string){
    console.log("called return user by email method")
    console.log('URI used:',`${this.apiUri}?searchTerm=${email}`)
    return this.http.get(`${this.apiUri}?searchTerm=${email}`);
  }

  getCurrentUser(): Observable<IUser>{
    return this._currentUser.asObservable();
  }

  setCurrentUser(user: IUser){
    console.log("called set current user in user repo service")
    this._currentUser.next(user);
  }
}
