import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../login/user.service';
import { SpinnerService } from '../../../core/ui/spinner.service';
import { NotificationService } from '../../../core/ui/notification.service';
import { finalize, takeUntil } from 'rxjs/operators';
import { AppRoutes, User } from '../../../core/app.model';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    private _uns$: Subject<void> = new Subject<void>();
    userForm: FormGroup;

    userEmailVal = new FormControl('', Validators.compose([Validators.required, Validators.email, Validators.minLength(10)]));
    nickNameVal = new FormControl('', Validators.compose([Validators.required]));

    user: User;

    constructor(
        public fb: FormBuilder,
        private router: Router,
        private userService: UserService,
        private spinnerService: SpinnerService,
        private notificationService: NotificationService,
    ) {
    }

    ngOnInit() {
        this.createInitialForm();
    }

    ionViewWillLeave(): void {
        this._uns$.next();
        this._uns$.complete();
    }

    ionViewWillEnter() {
        this.loadData();
    }

    private createInitialForm() {
        this.userForm = this.fb.group({
            userEmail: this.userEmailVal,
            nickName: this.nickNameVal,
        });
    }

    private loadData() {
        this.user = this.userService.user;
        this.userForm.controls.userEmail.setValue(this.user.email);
        this.userForm.controls.nickName.setValue(this.user?.data?.nomeApelido);
    }

    save() {
        this.spinnerService.showLoading('Salvando dados...');
        this.userService
            .update(this.userForm.value.userEmail, this.userForm.value.nickName)
            .pipe(
                finalize(() => {
                    this.spinnerService.dismissLoading();
                }),
                takeUntil(this._uns$)
            )
            .subscribe((ret) => {
                if (ret === true) {
                    this.goToHome();
                } else {
                    this.notificationService.showInfo('Não foi possível atualizar as informações', 'Não localizamos um registro válido após a atualização. Favor efetue o processo novamente.');
                }
            });

    }


    clear() {
        this.userForm.reset();
    }

    cancel() {
        this.createInitialForm();
        this.clear();
        this.goToHome();
    }

    private goToHome() {
        if (this.userService.hasRegions()) {
            this.router.navigateByUrl(AppRoutes.favorite.home);
        } else {
            this.router.navigateByUrl(AppRoutes.favorite.create).finally(() => this.clear());
        }
    }

    delete() {
        this.spinnerService.showLoading('Excluindo perfil...');
        this.userService
            .delete()
            .pipe(
                finalize(() => {
                    this.spinnerService.dismissLoading();
                }),
                takeUntil(this._uns$)
            )
            .subscribe(() => {
                this.router.navigateByUrl(AppRoutes.login);
            });
    }

}
