import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TrailRepositoryService } from '../trail-repository.service';
import { WeatherRepositoryService } from '../weather-repository.service';
import { IUser } from 'src/app/interfaces/IUser';

import {
  faCircleInfo,
  faHeartCirclePlus,
  faHeartCircleMinus,
} from '@fortawesome/free-solid-svg-icons';
import { UserRepositoryService } from 'src/app/user/user-repository.service';
import { isTypeQueryNode } from 'typescript';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-trail-search',
  templateUrl: './trail-search.component.html',
  styleUrls: ['./trail-search.component.css'],
})
export class TrailSearchComponent implements OnInit {
  constructor(
    private trailService: TrailRepositoryService,
    private weatherService: WeatherRepositoryService,
    private userService: UserRepositoryService
  ) {}

  ngOnInit(): void {
    console.log('hit trail search on init');

    this.userService.getCurrentUser().subscribe((value) => {
      this.currentUser = value;
    });

    console.log(this.currentUser);
  }

  trailResult: any = [];
  weatherResult: any = [];
  faCircleInfo = faCircleInfo;
  faHeartCirclePlus = faHeartCirclePlus;
  faHeartCircleMinus = faHeartCircleMinus;
  currentUser: any | null;

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

  addTrailToFavorites(id: number) {
    this.currentUser = this.userService
      .getCurrentUser()
      .subscribe((response) => {
        this.currentUser = response;
      });
    console.log(this.currentUser);
    console.log({ id });
  }

  removeTrailFromFavorites(id: number) {}
}
