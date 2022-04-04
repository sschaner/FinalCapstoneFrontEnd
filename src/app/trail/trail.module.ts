import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrailSearchComponent } from './trail-search/trail-search.component';
import { TrailDetailComponent } from './trail-detail/trail-detail.component';

@NgModule({
  declarations: [TrailSearchComponent, TrailDetailComponent],
  imports: [CommonModule],
  exports: [TrailSearchComponent, TrailDetailComponent],
})
export class TrailModule {}
