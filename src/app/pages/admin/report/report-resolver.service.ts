import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Region } from '../../../core/app.model';
import { DatasetDataFullRequest, DatasetDataFullService } from '../../../core/api/brasil-io-api/dataset-data-full/dataset-data-full.service';
import { SpinnerService } from '../../../core/ui/spinner.service';
import { NotificationService } from '../../../core/ui/notification.service';

@Injectable({
    providedIn: 'root'
})
export class ReportResolverService implements Resolve<any> {

    constructor(
        private datasetDataFullService: DatasetDataFullService,
        private spinnerService: SpinnerService,
        private router: Router,
        private notificationService: NotificationService,
    ) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): any {
        const data = this.router.getCurrentNavigation().extras.state;
        const reg: Region = data && data.vo ? data.vo : null;
        if (reg) {
            this.spinnerService.showLoading('Consultando região...');
            const req: DatasetDataFullRequest = new DatasetDataFullRequest();
            req.city = reg.name;
            // req.city = 'Canoas';
            return this.datasetDataFullService.report(req)
                       .pipe(
                           finalize(() => this.spinnerService.dismissLoading())
                       );
        } else {
            this.notificationService.showInfo('Busca região', 'Não foi possível identificar a Região selecionada');
        }
    }

}
