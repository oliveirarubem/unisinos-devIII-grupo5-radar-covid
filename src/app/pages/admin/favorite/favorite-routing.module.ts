import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FavoritePage } from './favorite.page';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { FavoriteInsertComponent } from './favorite-insert/favorite-insert.component';

const routes: Routes = [
    {
        path: '',
        component: FavoritePage,
        children: [
            {
                path: 'list',
                component: FavoriteListComponent,
            },
            {
                path: 'create',
                component: FavoriteInsertComponent,
            },
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full',
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FavoritePageRoutingModule {}
