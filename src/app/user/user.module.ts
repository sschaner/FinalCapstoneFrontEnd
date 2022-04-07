import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegisterComponent } from './user-register/user-register.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserRegisterComponent],
  imports: [CommonModule, FormsModule],
  exports: [UserRegisterComponent],
})
export class UserModule {}
