import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [HomepageComponent],
  imports: [CommonModule, NgbModule, CoreModule],
  exports: [HomepageComponent],
})
export class HomeModule {}
