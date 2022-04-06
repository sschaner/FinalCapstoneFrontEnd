import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './home/homepage/homepage.component';
import { TrailDetailComponent } from './trail/trail-detail/trail-detail.component';
import { TrailSearchComponent } from './trail/trail-search/trail-search.component';

const routes: Routes = [
  { path: 'home', component: HomepageComponent },
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
export class AppRoutingModule {}
