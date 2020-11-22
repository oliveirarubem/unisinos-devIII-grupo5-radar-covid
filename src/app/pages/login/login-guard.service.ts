import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root',
})
export class LoginGuardService implements CanActivate {
    constructor(private userService: UserService, private router: Router) {
    }

    canActivate(): boolean {
        const value = this.userService.isAuthenticated();
        if (!value) {
            this.router.navigateByUrl('/login');
        }
        return value;
    }
}
