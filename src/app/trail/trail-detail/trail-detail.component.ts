import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
import { TrailRepositoryService } from '../trail-repository.service';
import { WeatherRepositoryService } from '../weather-repository.service';

@Component({
  selector: 'app-trail-detail',
  templateUrl: './trail-detail.component.html',
  styleUrls: ['./trail-detail.component.css'],
})
export class TrailDetailComponent implements OnInit {
  trailResult: any = [];
  trailId: number = 1;
  faHandPointLeft = faHandPointLeft;
  zoom = 12;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };
  latitude: number = 0;
  longitude: number = 0;

  constructor(
    private trailService: TrailRepositoryService,
    private weatherService: WeatherRepositoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.trailId = this.route.snapshot.params['trailId'];
    this.trailResult = this.trailService
      .getTrailById(this.trailId)
      .subscribe((response) => {
        this.trailResult = response;
        this.latitude = parseInt(this.trailResult[0].lat);
        this.longitude = parseInt(this.trailResult[0].lon);
        console.log(`latitude: ${this.latitude}`);
        console.log(`longitude: ${this.longitude}`);
        this.center = {
          lat: this.latitude,
          lng: this.longitude,
        };
      });
  }
}
