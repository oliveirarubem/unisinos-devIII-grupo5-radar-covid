import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportResponse } from '../../../core/api/brasil-io-api/dataset-data-full/dataset-data-full.service';
import { IbgeService } from '../../../core/ibge/ibge.service';
import { AppRoutes } from '../../../core/app.model';


@Component({
    selector: 'app-report',
    templateUrl: './report.page.html',
    styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
    report: ReportResponse;

    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private ibgeService: IbgeService,
    ) {
    }

    ngOnInit() {
        this.activeRoute.data.subscribe((data: { list: ReportResponse[] }) => {
            if (data && data.list) {
                this.report = data.list[0];
            }
        });
    }


    goToFavorites() {
        this.router.navigateByUrl(AppRoutes.favorite.home);
    }
}
