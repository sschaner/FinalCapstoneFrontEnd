import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TrailRepositoryService } from '../trail-repository.service';
import { WeatherRepositoryService } from '../weather-repository.service';
import { Chart, registerables } from 'chart.js';

import {
  faCircleInfo,
  faHeartCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import { UserRepositoryService } from 'src/app/user/user-repository.service';

@Component({
  selector: 'app-trail-search',
  templateUrl: './trail-search.component.html',
  styleUrls: ['./trail-search.component.css'],
})
export class TrailSearchComponent implements OnInit {
  trailResult: any = [];
  weatherResult: any = [];
  trailLengths: any = [];
  trailRatings: any = [];
  trailNames: any = [];
  trailBarChart: any;
  trailBarChartCanvas: any;
  trailBarChartVisibility: boolean = false;
  faCircleInfo = faCircleInfo;
  faHeartCirclePlus = faHeartCirclePlus;
  currentUser: any;
  successMessage = '';
  failureMessage = '';

  constructor(
    private trailService: TrailRepositoryService,
    private weatherService: WeatherRepositoryService,
    private userService: UserRepositoryService
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((value) => {
      this.currentUser = value;
    });

    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    document.querySelector('nav').classList.add('gray');
  }

  ngOnDestroy() {
    document.querySelector('nav').classList.remove('gray');
  }

  searchTrails(form: NgForm) {
    if (this.trailBarChartCanvas != null) {
      this.trailBarChartCanvas.destroy();
    }
    let location: string = form.form.value.location;
    this.trailResult = this.trailService.searchTrails(location).subscribe(
      (response) => {
        this.trailResult = response;
        if (this.trailLengths.length >= 0) {
          this.trailLengths = [];
        }
        if (this.trailRatings.length >= 0) {
          this.trailRatings = [];
        }
        if (this.trailNames.length >= 0) {
          this.trailNames = [];
        }
        for (var i = 0; i < this.trailResult.length; i++) {
          this.trailLengths.push(parseFloat(this.trailResult[i].length));
          this.trailRatings.push(parseFloat(this.trailResult[i].rating));
          this.trailNames.push(this.trailResult[i].name);
        }
        this.loadTrailBarChart();
      },
      (err) => {
        (this.trailResult = []),
          (this.failureMessage =
            'Sorry, it does not look like we have any info on trails in this area! Try another city or postal code.');
      }
    );

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

  loadTrailBarChart() {
    // console.log(this.trailBarChartCanvas);
    // if (this.trailBarChartCanvas) {
    //   console.log('update');
    //   this.trailBarChartCanvas.update();
    // }

    const trailChart = <HTMLCanvasElement>(
      document.getElementById('trail-length-bar-chart')
    );
    const ctx = trailChart.getContext('2d');
    this.trailBarChartVisibility = true;
    this.trailBarChartCanvas = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.trailNames,
        datasets: [
          {
            label: 'Length',
            data: this.trailLengths,
            backgroundColor: ['red'],
            borderColor: ['black'],
            borderWidth: 1,
          },
          {
            label: 'Difficulty (Out of 5)',
            data: this.trailRatings,
            backgroundColor: ['blue'],
            borderColor: ['black'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: Math.max(...this.trailLengths) + 5,
          },
          x: {
            ticks: {
              autoSkip: false,
              maxRotation: 45,
              minRotation: 45,
            },
            title: {
              display: true,
              text: 'Trail Name',
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'Trails',
          },
        },
      },
    });
  }
}
