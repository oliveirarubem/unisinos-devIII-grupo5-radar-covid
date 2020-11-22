import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { UserService } from './user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from '../../core/ui/spinner.service';
import { NotificationService } from '../../core/ui/notification.service';
import { IonInput } from '@ionic/angular';
import { AppRoutes } from '../../core/app.model';


const STATE = {
    identification: {
        title: 'Identificação',
        spinner: 'Identificando...'
    },
    registration: {
        title: 'Cadastro',
        spinner: 'Registrando...'
    }
};

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
    @ViewChild('userEmailInput', {static: false}) userEmailInput: IonInput;
    @ViewChild('nickNameInput', {static: false}) nickNameInput: IonInput;

    private _uns$: Subject<void> = new Subject<void>();

    loginForm: FormGroup;
    isRegistration = false;


    userEmailVal = new FormControl('teste@teste.com.br', Validators.compose([Validators.required, Validators.minLength(10)]));
    nickNameVal = new FormControl('', Validators.compose([Validators.required, Validators.minLength(10)]));

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

    ngOnDestroy(): void {
        this._uns$.next();
        this._uns$.complete();
    }

    private createInitialForm() {
        this.loginForm = this.fb.group({
            userEmail: this.userEmailVal,
            nickName: '',
        });
    }

    login() {
        this.spinnerService.showLoading(this.isRegistration ? STATE.registration.spinner : STATE.identification.spinner);
        if (this.isRegistration) {
            this.userService
                .register(this.loginForm.value.userEmail, this.loginForm.value.nickName)
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
                        this.notificationService.showInfo('Não foi possível registrar', 'Não localizamos um registro válido após o registro. Favor efetue o processo novamente.');
                        this.showRegistration();
                    }
                });
        } else {
            this.userService
                .login(this.loginForm.value.userEmail)
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
                        this.notificationService.showInfo('Registro não localizado', 'Não localizamos um registro com o e-mail informado. Favor efetue o cadastro.');
                        this.showRegistration();
                    }
                });
        }

    }

    private showRegistration() {
        this.isRegistration = true;
        this.loginForm.addControl('nickName', this.nickNameVal);
        setTimeout(() => {
            this.setFocus(this.nickNameInput);
        }, 10);
    }

    private setFocus(input: IonInput, ms = 700) {
        if (input) {
            setTimeout(() => input.setFocus().then(), ms);
        }
    }

    clear() {
        this.loginForm.reset();
        this.setFocus(this.userEmailInput, 300);
    }

    getTitle() {
        return this.isRegistration === true ? STATE.registration.title : STATE.identification.title;
    }

    cancel() {
        this.createInitialForm();
        this.clear();
        this.isRegistration = false;
    }

    private goToHome() {
        if (this.userService.hasRegions()) {
            this.router.navigateByUrl(AppRoutes.favorite.home);
        } else {
            this.router.navigateByUrl(AppRoutes.favorite.create).finally(() => this.clear());
        }
    }
}
