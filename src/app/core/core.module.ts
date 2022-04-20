import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [NavigationComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModalModule,
    FontAwesomeModule,
  ],
  exports: [NavigationComponent, FooterComponent],
})
export class CoreModule { }
