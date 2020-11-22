import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../login/user.service';
import { SpinnerService } from '../../../../core/ui/spinner.service';
import { NotificationService } from '../../../../core/ui/notification.service';
import { AppRoutes } from '../../../../core/app.model';

@Component({
  selector: 'app-favorite-insert',
  templateUrl: './favorite-insert.component.html',
  styleUrls: ['./favorite-insert.component.scss'],
})
export class FavoriteInsertComponent implements OnInit, OnDestroy {
  @ViewChild('regionName', {static: false}) regionNameInput: IonInput;
  private _uns$: Subject<void> = new Subject<void>();

  regionForm: FormGroup;
  regionNameVal = new FormControl('', Validators.compose([Validators.required, Validators.minLength(10)]));

  constructor(
      public fb: FormBuilder,
      private router: Router,
      private userService: UserService,
      private spinnerService: SpinnerService,
      private notificationService: NotificationService,
  ) {
  }

  ngOnInit() {
    this.regionForm = this.fb.group({
      regionName: this.regionNameVal,
    });
  }

  ngOnDestroy(): void {
    this._uns$.next();
    this._uns$.complete();
  }


  save() {

  }

  private setFocus(input: IonInput, ms = 700) {
    if (input) {
      setTimeout(() => input.setFocus().then(), ms);
    }
  }

  clear() {
    this.regionForm.reset();
    this.setFocus(this.regionNameInput, 300);
  }

  cancel() {
    this.router.navigate([AppRoutes.favorite.list]);
  }
}
