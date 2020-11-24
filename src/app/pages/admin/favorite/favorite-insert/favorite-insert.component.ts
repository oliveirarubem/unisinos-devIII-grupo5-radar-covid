import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { Subject, Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../login/user.service';
import { SpinnerService } from '../../../../core/ui/spinner.service';
import { NotificationService } from '../../../../core/ui/notification.service';
import { AppRoutes } from '../../../../core/app.model';
import { IbgeService } from '../../../../core/ibge/ibge.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { IbgeRegion } from '../../../../core/ibge/ibge-region.model';
import { finalize, takeUntil } from 'rxjs/operators';
import { RegionService } from '../region.service';

@Component({
    selector: 'app-favorite-insert',
    templateUrl: './favorite-insert.component.html',
    styleUrls: ['./favorite-insert.component.scss'],
})
export class FavoriteInsertComponent implements OnInit {
    @ViewChild('regionName', {static: false}) regionNameInput: IonInput;
    private _uns$: Subject<void> = new Subject<void>();

    regionForm: FormGroup;
    regionNameVal = new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)]));

    regionsSubscription: Subscription;
    regions: IbgeRegion[];
    region: IbgeRegion;


    constructor(
        public fb: FormBuilder,
        private router: Router,
        private ibgeService: IbgeService,
        private userService: UserService,
        private regionService: RegionService,
        private spinnerService: SpinnerService,
        private notificationService: NotificationService,
    ) {
    }

    ngOnInit() {
        this.regionForm = this.fb.group({
            regionName: this.regionNameVal,
        });
    }

    ionViewWillLeave(): void {
        this._uns$.next();
        this._uns$.complete();
    }


    regionChange(event: {
        component: IonicSelectableComponent,
        value: IbgeRegion
    }) {
        // console.log('region:', event.value);
        this.region = event.value;
        this.regionForm.controls.regionName.setValue(event.value.nome);
    }

    searchRegions(event: {
        component: IonicSelectableComponent,
        text: string
    }) {
        const text = event.text.trim().toLowerCase();
        event.component.startSearch();

        // Close any running subscription.
        if (this.regionsSubscription) {
            this.regionsSubscription.unsubscribe();
        }

        if (!text) {
            // Close any running subscription.
            if (this.regionsSubscription) {
                this.regionsSubscription.unsubscribe();
            }

            event.component.items = [];
            event.component.endSearch();
            return;
        }

        this.regionsSubscription = this.ibgeService.getRegionsAsync().subscribe(ports => {
            // Subscription will be closed when unsubscribed manually.
            if (this.regionsSubscription.closed) {
                return;
            }

            event.component.items = this.filterRegions(ports, text);
            event.component.endSearch();
        });
    }

    filterRegions(ports: IbgeRegion[], text: string) {
        return ports.filter(port => {
            return port.nome.toLowerCase().indexOf(text) !== -1 ||
                port.id.toString().toLowerCase().indexOf(text) !== -1;
        });
    }


    save() {
        this.spinnerService.showLoading('Salvando regiao...');
        this.regionService
            .register(this.region.nome, this.region.id)
            .pipe(
                finalize(() => {
                    this.spinnerService.dismissLoading();
                }),
                takeUntil(this._uns$)
            )
            .subscribe((ret) => {
                if (ret === true) {
                    this.goToReport();
                } else {
                    this.notificationService.showInfo('Não foi possível registrar a região', 'Favor efetue o processo novamente.');
                }
            });
    }

    private setFocus(input: IonInput, ms = 700) {
        if (input) {
            setTimeout(() => input.setFocus().then(), ms);
        }
    }

    clear() {
        this.regionForm.reset();
        this.setFocus(this.regionNameInput, 300);
        this.region = null;
    }

    cancel() {
        this.router.navigate([AppRoutes.favorite.list]);
    }

    private goToReport() {
        // this.spinnerService.showLoading('Atualizando as informações');
        this.userService.reload()
            .pipe(
                finalize(() => {
                    // this.spinnerService.dismissLoading();
                }),
                takeUntil(this._uns$)
            )
            .subscribe(() => {
                this.router.navigateByUrl(AppRoutes.report, {state: {vo: this.region}});
            });
    }
}
