import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TrailRepositoryService } from '../trail-repository.service';
import { WeatherRepositoryService } from '../weather-repository.service';

import { faCircleInfo, faHeartCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { UserRepositoryService } from 'src/app/user/user-repository.service';

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
  currentUser: any;
  successMessage = '';
  failureMessage = '';

  constructor(
    private trailService: TrailRepositoryService,
    private weatherService: WeatherRepositoryService,
    private userService: UserRepositoryService
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((value) => {
      this.currentUser = value;
    });
  }

  ngAfterViewInit() {
    document.querySelector('nav').classList.add('gray');
  }

  ngOnDestroy() {
    document.querySelector('nav').classList.remove('gray');
  }

  searchTrails(form: NgForm) {
    let location: string = form.form.value.location;
    this.trailResult = this.trailService
      .searchTrails(location)
      .subscribe((response) => {
        this.trailResult = response;
      }, err => { this.trailResult = [], this.failureMessage = 'Sorry, it does not look like we have any info on trails in this area! Try another city or postal code.' });

    this.weatherResult = this.weatherService
      .getCurrentWeather(location)
      .subscribe((response) => {
        this.weatherResult = response;
      });
  }

  addTrailToFavorites(id: number) {
    let userId = this.currentUser.userId;
    this.userService.addFavoriteTrail(id, userId).subscribe();
    this.successMessage =
      "Success! You can view all your favorited trails on the 'Favorites' page.";
  }
}
