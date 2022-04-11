import { Component, OnInit } from '@angular/core';
import { UserRepositoryService } from 'src/app/user/user-repository.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  currentUser: any;

  constructor(private userService: UserRepositoryService) {}

  ngOnInit(): void {}
}
