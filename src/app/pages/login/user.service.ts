import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WpAdminCreateUserRequest, WpAdminGetUsersRequest, WpAdminService } from '../../core/api/backend/wp-admin/wp-admin.service';
import { map } from 'rxjs/operators';
import { User, UserData } from '../../core/app.model';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    user: User;

    constructor(private wpAdminService: WpAdminService) {
    }

    hasRegions(): boolean {
        return Boolean(this.user && this.user.regions && this.user.regions.length > 0);
    }

    isAuthenticated(): boolean {
        return Boolean(this.user);
    }

    login(userEmail: string): Observable<boolean> {
        const req: WpAdminGetUsersRequest = new WpAdminGetUsersRequest();
        req.nom = userEmail;
        return this.wpAdminService.getUser(req)
                   .pipe(map(user => {
                       this.user = user;
                       return this.isAuthenticated();
                   }));
    }

    register(userEmail: string, nickName: string): Observable<boolean> {
        const req: WpAdminCreateUserRequest = new WpAdminCreateUserRequest();
        req.nom = userEmail;
        req.data = new UserData(nickName);
        return this.wpAdminService.createUser(req)
                   .pipe(map(user => {
                       this.user = user;
                       return this.isAuthenticated();
                   }));
    }

    logout(): Observable<boolean> {
        this.user = null;
        return of(this.isAuthenticated());
    }
}
