import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegisterComponent } from './user-register/user-register.component';
import { FormsModule } from '@angular/forms';
import { UserDetailsComponent } from './user-details/user-details.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';




@NgModule({
  declarations: [UserRegisterComponent, UserDetailsComponent],
  imports: [
     CommonModule,
     FormsModule, 
     MatExpansionModule, 
     RouterModule,
     FontAwesomeModule],
  exports: [UserRegisterComponent],
})
export class UserModule {}
