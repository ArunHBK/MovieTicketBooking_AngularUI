import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private service: AuthService) { }
  authStatus!: boolean;

  ngOnInit(): void {
    console.log(this.service.loggedIn)
    this.authStatus = this.service.loggedIn
  }

  getAuthStatus(): boolean {
    return this.service.loggedIn;
  }

  logout(): void {
    this.service.logout()
  }
  isAdmin() {
    return this.service.isAdmin()
  }
}
