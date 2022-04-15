import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { BehaviorSubject, Observable } from 'rxjs';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserRepositoryService {
  private tempUser: IUser = {
    userId: -1,
    firstName: '',
    lastName: '',
    email: '',
  };
  private _currentUser: BehaviorSubject<IUser> | any = new BehaviorSubject(
    this.tempUser
  );
  private user: any;

  private apiUri = 'https://capstoneprojectapiservice.azure-api.net/api/User';
  private favoritesApiUri =
    'https://capstoneprojectapiservice.azure-api.net/api/UserTrail';

  constructor(private http: HttpClient, private router: Router) {}

  saveNewUser(user: IUser) {
    return this.http.post(this.apiUri, user).subscribe();
  }

  loginUser(email: string) {
    this.returnUserByEmail(email).subscribe((response) => {
      this.user = response;
      this.tempUser.userId = this.user.userId;
      this.tempUser.firstName = this.user.firstName;
      this.tempUser.lastName = this.user.lastName;
      this.tempUser.email = this.user.email;
    });
    this.setCurrentUser(this.tempUser);
  }

  returnUserByEmail(email: string) {
    return this.http.get<any>(`${this.apiUri}?searchTerm=${email}`);
  }

  getCurrentUser(): Observable<IUser> {
    if (this._currentUser.asObservable == undefined) {
      this.tempUser = {
        firstName: '',
        lastName: '',
        email: '',
        userId: -1,
      };
      this.setCurrentUser(this.tempUser);
    }
    return this._currentUser.asObservable();
  }

  setCurrentUser(user: IUser) {
    this._currentUser.next(user);
  }

  addFavoriteTrail(id: number, userId: number) {
    return this.http.post(
      `${this.favoritesApiUri}?userId=${userId}&trailId=${id}`,
      { id, userId }
    );
  }

  returnUserFavoriteTrails(userId: number) {
    return this.http.get(`${this.favoritesApiUri}?userId=${userId}`);
  }

  deleteTrailFromFavorites(userId: number, trailId: number) {
    /* return this.http.delete(
      `${this.favoritesApiUri}?userId=${userId}&trailId=${trailId}`
    ); */
    return this.http.delete(`https://finalcapstonebackend20220406191528.azurewebsites.net/api/UserTrail?userId=${userId}&trailId=${trailId}`);
  }
}
