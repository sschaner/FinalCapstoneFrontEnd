import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrailSearchComponent } from './trail-search/trail-search.component';
import { TrailDetailComponent } from './trail-detail/trail-detail.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [TrailSearchComponent, TrailDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatExpansionModule,
    FontAwesomeModule,
    GoogleMapsModule,
    NgbAlertModule
  ],
  exports: [TrailSearchComponent, TrailDetailComponent],
})
export class TrailModule {}
