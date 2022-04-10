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
  private user: any;
  

  saveNewUser(user: IUser) {
    console.log("called save new user method in repository service");
    console.log(user);
    return this.http.post(this.apiUri, user).subscribe();
  }

  loginUser(email: string){
    
   /*   this.returnUserByEmail(email).subscribe((response) => {
      this.user = response;
    }); */ 
    this.http.get(`${this.apiUri}?searchTerm=${email}`).subscribe((response) => {this.user = response;});
    
   /*  let user: IUser = {
      firstName: 'gggggg',
      lastName: 'gggggggg',
      email: 'ggggggggggggg',
      userId: -1
    } */
    
    
    console.log("current user: ", this.user)
    this.setCurrentUser(this.user);
  }


  returnUserByEmail(email: string){
    console.log("called return user by email method")
    console.log('URI used:',`${this.apiUri}?searchTerm=${email}`)
    return this.http.get<any>(`${this.apiUri}?searchTerm=${email}`);
    //return this.http.get("https://finalcapstonebackend20220406191528.azurewebsites.net/api/user?searchTerm=test").subscribe()
  }

  getCurrentUser(): Observable<IUser>{
    return this._currentUser.asObservable();
  }

  setCurrentUser(user: IUser){
    console.log("called set current user in user repo service")
    this._currentUser.next(user);
  }
}
