import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  private _uns$: Subject<void> = new Subject<void>();
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {}

  ngOnDestroy(): void {
    this._uns$.next();
    this._uns$.complete();
  }

  login() {
    this.loginService
      .login()
      .pipe(takeUntil(this._uns$))
      .subscribe(() => {
        this.router.navigateByUrl('/pages');
      });
  }
}
