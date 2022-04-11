import { Component, OnInit } from '@angular/core';
import { UserRepositoryService } from '../user-repository.service';
import {
  faCircleInfo,
  faHeartCirclePlus,
  faHeartCircleMinus,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private userService: UserRepositoryService) { }
  currentUser: any;
  userFavorites: any = [];
  faCircleInfo = faCircleInfo;
  faHeartCircleMinus = faHeartCircleMinus;

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((value) => {
      this.currentUser = value;
    });    

    this.userService.returnUserFavoriteTrails(this.currentUser.userId).subscribe((value) => {this.userFavorites = value});

  }

  removeTrailFromFavorites(id: number){
      
  }

}
