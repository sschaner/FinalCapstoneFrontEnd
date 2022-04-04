import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './home/homepage/homepage.component';
import { TrailSearchComponent } from './trail/trail-search/trail-search.component';

const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'trail-search', component: TrailSearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
