import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrailSearchComponent } from './trail-search/trail-search.component';
import { TrailDetailComponent } from './trail-detail/trail-detail.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TrailSearchComponent, TrailDetailComponent],
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [TrailSearchComponent, TrailDetailComponent],
})
export class TrailModule {}
