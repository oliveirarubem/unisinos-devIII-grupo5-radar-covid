import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLoggedIn = false;

  constructor() {}

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  login(): Observable<boolean> {
    this.isLoggedIn = true;
    return of(true);
  }
  logout(): Observable<boolean> {
    this.isLoggedIn = false;
    return of(true);
  }
}
