import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [NavigationComponent],
  imports: [CommonModule, RouterModule, FormsModule, NgbModalModule],
  exports: [NavigationComponent],
})
export class CoreModule { }
