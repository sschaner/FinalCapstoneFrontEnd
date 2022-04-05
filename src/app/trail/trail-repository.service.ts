import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrailRepositoryService {

  constructor(private http: HttpClient) { }

  private apiUri = "https://localhost:44349/api/trail";

  searchTrails(location: string){
    console.log("called search trails api")
    return this.http.get(`${this.apiUri}/?searchTerm=${location}`);
  }
}
