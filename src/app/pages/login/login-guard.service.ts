import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuardService implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): boolean {
    const value = this.loginService.isAuthenticated(); // <= from auth service
    if (!value) {
      this.router.navigateByUrl('/login');
    }
    return value;
  }
}
