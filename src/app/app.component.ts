import { Component, OnDestroy, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './pages/login/user.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AppRoutes } from './core/app.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private _uns$: Subject<void> = new Subject<void>();

  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Cidades Favoritas',
      url: AppRoutes.favorite.list,
      icon: 'heart',
    },
    {
      title: 'Perfil',
      url: '/pages/profile',
      icon: 'options',
    },
    {
      title: 'Sobre',
      url: '/pages/about',
      icon: 'alert-circle',
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private loginService: UserService,
    public userService: UserService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this._uns$.next();
    this._uns$.complete();
  }

  isLogged() {
    return this.loginService.isAuthenticated();
  }

  logout() {
    return this.loginService
      .logout()
      .pipe(takeUntil(this._uns$))
      .subscribe(() => {
        this.router.navigateByUrl('/login');
      });
  }
}
