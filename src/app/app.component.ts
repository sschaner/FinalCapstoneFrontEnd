import { Component } from '@angular/core';
import { ReactiveFormConfig } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FinalCapstoneFrontend';

  ngOnInit(){
    ReactiveFormConfig.set({
      validationMessage: {
        required: 'This field is required.',
        minLenght: 'Enter minimum length of {{0}} characters.',
        alpha: 'Only letters please!',
        email: 'Please enter a valid email in the form of \'something@something.com\''
      }
  });
}
}
