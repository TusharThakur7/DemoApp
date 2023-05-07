import { Component } from '@angular/core';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  openRegistrationForm() {
    window.open('/registration', 'Registration Form', 'width=400,height=400');
  }
}