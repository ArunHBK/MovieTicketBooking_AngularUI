import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../Models/api-response';
import jwt_decode, { JwtDecodeOptions } from "jwt-decode";
import { JwtPayload } from '../Models/jwt-payload';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = environment.apiBaseUrl;
  token: any = localStorage.getItem("accessToken");
  loggedIn: boolean = localStorage.getItem("accessToken") != null ? true : false;

  roleUrl = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
  nameUrl = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';
  userName: string = '';

  constructor(private http: HttpClient) { }

  login(data: any): Observable<ApiResponse> {
    console.log(data)
    return this.http.post<ApiResponse>(`${environment.apiBaseUrl}/Authentication/Login`, data);
  }

  logout() {
    localStorage.removeItem("accessToken");
    this.loggedIn = false;
    location.reload();
  }

  isAdmin() {
    if (this.token == null)
      return false;
    let jwt = new JwtHelperService();
    let decodedToken = jwt.decodeToken(this.token)
    let role = decodedToken[this.roleUrl];
    this.userName = decodedToken[this.nameUrl]
    localStorage.setItem('userName', this.userName);
    let exp = jwt.isTokenExpired(this.token);
    if (exp) {
      this.logout();
    }
    if (role == "Admin")
      return true;
    return false;
  }
}