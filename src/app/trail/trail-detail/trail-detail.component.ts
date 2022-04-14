import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
import { TrailRepositoryService } from '../trail-repository.service';

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
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 30,
    minZoom: 3,
  };
  latitude: number = 0;
  longitude: number = 0;
  marker: any;

  constructor(
    private trailService: TrailRepositoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.trailId = this.route.snapshot.params['trailId'];
    this.trailResult = this.trailService
      .getTrailById(this.trailId)
      .subscribe((response) => {
        this.trailResult = response;
        this.latitude = parseFloat(this.trailResult[0].lat);
        this.longitude = parseFloat(this.trailResult[0].lon);
        this.center = {
          lat: this.latitude,
          lng: this.longitude,
        };
        this.marker = {
          position: {
            lat: this.latitude,
            lng: this.longitude,
          },
          // options: { animation: google.maps.Animation.BOUNCE },
        };
      });
  }
}
