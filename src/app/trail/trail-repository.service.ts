import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TrailRepositoryService {
  constructor(private http: HttpClient) {}

  private apiUri = 'https://capstoneprojectapiservice.azure-api.net/api/trail';

  searchTrails(location: string) {
    return this.http.get(`${this.apiUri}?searchTerm=${location}`);
  }

  getTrailById(id: number) {
    return this.http.get(`${this.apiUri}/${id}`);
  }
}
