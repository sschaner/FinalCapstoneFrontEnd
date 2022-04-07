import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserRepositoryService {
  constructor(private http: HttpClient) {}

  private apiUri = 'https://capstoneprojectapiservice.azure-api.net/api/User';

  saveNewUser(user: IUser) {
    return this.http.post(this.apiUri, user).subscribe();
  }
}
