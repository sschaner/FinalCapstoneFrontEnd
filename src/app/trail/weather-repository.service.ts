import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherRepositoryService {


  constructor(private http: HttpClient) { }

  private apiUri = "https://localhost:44349/api/weather";

  getCurrentWeather(location: string){
    console.log("called current weather api")
    return this.http.get(`${this.apiUri}/?searchTerm=${location}`);
  }
}
