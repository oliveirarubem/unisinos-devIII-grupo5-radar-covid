import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritePageRoutingModule } from './favorite-routing.module';

import { FavoritePage } from './favorite.page';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { FavoriteInsertComponent } from './favorite-insert/favorite-insert.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        FavoritePageRoutingModule
    ],
    declarations: [
        FavoritePage,
        FavoriteListComponent,
        FavoriteInsertComponent
    ]
})
export class FavoritePageModule {}
