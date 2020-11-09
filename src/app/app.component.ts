import { Component, OnDestroy, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoginService } from './pages/login/login.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
      title: 'Home',
      url: '/pages/home',

      icon: 'home',
    },
    {
      title: 'Favoritos',
      url: '/pages/favorite',
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
    private loginService: LoginService,
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
    const path = window.location.pathname.split('pages/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(
        (page) => page.title.toLowerCase() === path.toLowerCase(),
      );
    }
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
