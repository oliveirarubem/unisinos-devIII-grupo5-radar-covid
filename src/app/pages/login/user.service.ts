import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { WpAdminCreateUserRequest, WpAdminDeleteRequest, WpAdminGetUsersRequest, WpAdminService, WpAdminUpdateUserRequest } from '../../core/api/backend/wp-admin/wp-admin.service';
import { concatMap, map } from 'rxjs/operators';
import { User, UserData } from '../../core/app.model';
import { fromArray } from 'rxjs/internal/observable/fromArray';

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

    update(userEmail: string, nickName: string): Observable<boolean> {
        const req: WpAdminUpdateUserRequest = new WpAdminUpdateUserRequest();
        req.id = this.user.id;
        req.nom = userEmail;
        req.data = new UserData(nickName);
        return this.wpAdminService.updateUser(req)
                   .pipe(map(user => {
                       this.user = new User(user.id, user.email, user.data, this.user.regions);
                       return Boolean(this.user);
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

    delete(): Observable<boolean> {
        const req: WpAdminDeleteRequest = new WpAdminDeleteRequest();
        req.id = this.user.id;

        const regions = this.user.regions;
        const $delete = fromArray(regions)
            .pipe((concatMap((region) => {
                const req: WpAdminDeleteRequest = new WpAdminDeleteRequest();
                req.id = region.id;
                return this.wpAdminService.deleteRegion(req);
            })));

        return forkJoin([$delete, this.wpAdminService.deleteUser(req)
                                      .pipe(map(() => {
                                          this.user = null;
                                          return this.isAuthenticated();
                                      }))])
            .pipe(map(() => true));
    }

    logout(): Observable<boolean> {
        this.user = null;
        return of(this.isAuthenticated());
    }

    reload(): Observable<boolean> {
        return this.login(this.user.email);
    }
}
