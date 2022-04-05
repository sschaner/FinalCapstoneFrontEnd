import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
      });
  }
}
