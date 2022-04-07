import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TrailRepositoryService } from '../trail-repository.service';
import { WeatherRepositoryService } from '../weather-repository.service';

import {
  faCircleInfo,
  faHeartCirclePlus,
  faHeartCircleMinus,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-trail-search',
  templateUrl: './trail-search.component.html',
  styleUrls: ['./trail-search.component.css'],
})
export class TrailSearchComponent implements OnInit {
  constructor(
    private trailService: TrailRepositoryService,
    private weatherService: WeatherRepositoryService
  ) {}

  ngOnInit(): void {}

  trailResult: any = [];
  weatherResult: any = [];
  faCircleInfo = faCircleInfo;
  faHeartCirclePlus = faHeartCirclePlus;
  faHeartCircleMinus = faHeartCircleMinus;

  searchTrails(form: NgForm) {
    console.log('called search trails method');

    let location: string = form.form.value.location;
    this.trailResult = this.trailService
      .searchTrails(location)
      .subscribe((response) => {
        this.trailResult = response;
      });
    console.log(this.trailResult);

    this.weatherResult = this.weatherService
      .getCurrentWeather(location)
      .subscribe((response) => {
        this.weatherResult = response;
      });
    console.log(this.weatherResult);
  }

  addTrailToFavorites(id: number) {}

  removeTrailFromFavorites(id: number) {}
}
