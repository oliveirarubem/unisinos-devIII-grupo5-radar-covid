import { Component, OnInit } from '@angular/core';
import { Region } from '../../../../core/app.model';
import { UserService } from '../../../login/user.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss'],
})
export class FavoriteListComponent implements OnInit {

  regions: Region[];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.regions = this.userService?.user?.regions;
  }

  goToReport(reg: Region) {

  }

  delete(reg: Region) {

  }
}
