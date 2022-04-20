import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [HomepageComponent],
  imports: [CommonModule, NgbModule],
  exports: [HomepageComponent],
})
export class HomeModule { }
