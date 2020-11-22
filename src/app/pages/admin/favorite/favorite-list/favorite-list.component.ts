import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppRoutes, Region } from '../../../../core/app.model';
import { UserService } from '../../../login/user.service';
import { Router } from '@angular/router';
import { RegionService } from '../region.service';
import { concatMap, finalize, takeUntil, tap } from 'rxjs/operators';
import { SpinnerService } from '../../../../core/ui/spinner.service';
import { NotificationService } from '../../../../core/ui/notification.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-favorite-list',
    templateUrl: './favorite-list.component.html',
    styleUrls: ['./favorite-list.component.scss'],
})
export class FavoriteListComponent implements OnInit, OnDestroy {
    private _uns$: Subject<void> = new Subject<void>();
    regions: Region[];

    constructor(
        private router: Router,
        private userService: UserService,
        private regionService: RegionService,
        private spinnerService: SpinnerService,
        private notificationService: NotificationService
    ) {
    }

    ngOnInit() {
        this.regions = this.userService?.user?.regions;
    }

    ngOnDestroy(): void {
        this._uns$.next();
        this._uns$.complete();
    }


    goToReport(reg: Region) {
        this.router.navigateByUrl(AppRoutes.report, {state: {vo: reg}});
    }

    delete(reg: Region) {
        this.spinnerService.showLoading('Deletando registro...');
        this.regionService
            .delete(reg)
            .pipe(
                finalize(() => {
                    this.spinnerService.dismissLoading();
                }),
                takeUntil(this._uns$),
                concatMap(() => this.userService.reload()),
                tap(() => this.regions = this.userService?.user?.regions)
            )
            .subscribe(() => {
                console.log('FavoriteListComponent.delete');
            });
    }
}
