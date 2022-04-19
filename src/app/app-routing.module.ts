import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './home/homepage/homepage.component';
import { TrailDetailComponent } from './trail/trail-detail/trail-detail.component';
import { TrailSearchComponent } from './trail/trail-search/trail-search.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';

const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'app-user-details', component: UserDetailsComponent },
  { path: 'register', component: UserRegisterComponent },
  { path: 'trail-search', component: TrailSearchComponent },
  {
    path: 'trail-detail/:trailId',
    component: TrailDetailComponent,
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
