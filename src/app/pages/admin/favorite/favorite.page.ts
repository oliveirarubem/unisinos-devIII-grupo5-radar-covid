import { Component, OnInit } from '@angular/core';
import { UserService } from '../../login/user.service';
import { AppRoutes, Region } from '../../../core/app.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-favorite',
    templateUrl: './favorite.page.html',
    styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {

    regions: Region[];

    constructor(
        private router: Router,
        private userService: UserService
    ) {
    }

    ngOnInit() {
        this.regions = this.userService?.user?.regions;
    }

    goToReport(reg: Region) {

    }

    delete(reg: Region) {

    }

    goToCreate() {
        this.router.navigate([AppRoutes.favorite.create] );
        }
}
