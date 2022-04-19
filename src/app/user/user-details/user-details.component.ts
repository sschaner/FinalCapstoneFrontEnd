import { Component, OnInit } from '@angular/core';
import { UserRepositoryService } from '../user-repository.service';
import {
  faCircleInfo,
  faHeartCircleMinus,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  constructor(
    private userService: UserRepositoryService,
    private router: Router
  ) {}

  currentUser: any;
  userFavorites: any = [];
  faCircleInfo = faCircleInfo;
  faHeartCircleMinus = faHeartCircleMinus;

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((value) => {
      this.currentUser = value;
    });

    this.userService
      .returnUserFavoriteTrails(this.currentUser.userId)
      .subscribe((value) => {
        this.userFavorites = value;
      });
  }

  ngAfterViewInit() {
    document.querySelector('nav').classList.add('gray');
  }

  ngOnDestroy() {
    document.querySelector('nav').classList.remove('gray');
  }

  removeTrailFromFavorites(trailId: number) {
    this.userService
      .deleteTrailFromFavorites(this.currentUser.userId, trailId)
      .subscribe();
    this.userService
      .returnUserFavoriteTrails(this.currentUser.userId)
      .subscribe((value) => {
        this.userFavorites = value;
      });
    this.reloadCurrentRoute();
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
