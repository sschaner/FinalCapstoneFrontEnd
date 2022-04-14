import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TrailRepositoryService } from '../trail-repository.service';
import { WeatherRepositoryService } from '../weather-repository.service';
import { IUser } from 'src/app/interfaces/IUser';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

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
  trailResult: any = [];
  weatherResult: any = [];
  faCircleInfo = faCircleInfo;
  faHeartCirclePlus = faHeartCirclePlus;
  faHeartCircleMinus = faHeartCircleMinus;
  currentUser: any;
  successMessage = '';
  staticAlertClosed = false;
  private _success = new Subject<string>();
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;

  constructor(
    private trailService: TrailRepositoryService,
    private weatherService: WeatherRepositoryService,
    private userService: UserRepositoryService
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((value) => {
      this.currentUser = value;
    });
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(1500)).subscribe(() => {
       if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      } 
    });
    
  }

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
    let userId = this.currentUser.userId;
    console.log(this.currentUser.firstName);
    console.log({ id });
    this.userService.addFavoriteTrail(id, userId).subscribe();
    this.successMessage = 'Success! You can view all your favorited trails on the \'Favorites\' page'
  }

  removeTrailFromFavorites(id: number) {}


}
