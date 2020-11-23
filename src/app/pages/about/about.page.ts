import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from '../../core/app.model';
import { UserService } from '../login/user.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.page.html',
    styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

    constructor(
        private router: Router,
        private userService: UserService
    ) {
    }

    ngOnInit() {
    }

    goToHome() {
        if (this.userService.hasRegions()) {
            this.router.navigateByUrl(AppRoutes.favorite.home);
        } else {
            this.router.navigateByUrl(AppRoutes.favorite.create);
        }
    }
}
