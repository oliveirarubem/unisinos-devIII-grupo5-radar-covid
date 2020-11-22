import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiWpAdminConfService } from './api/backend/api-wp-admin.model';
import { ApiWpAdminConfPrdTest } from './api/backend/api-wp-admin-conf.prd.config';
import { WpAdminService } from './api/backend/wp-admin/wp-admin.service';
import { WpAdminPrdService } from './api/backend/wp-admin/wp-admin.prd.service';
import { HttpClient } from '@angular/common/http';


@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        {provide: ApiWpAdminConfService, useClass: ApiWpAdminConfPrdTest},
        {provide: WpAdminService, useClass: WpAdminPrdService, deps: [ApiWpAdminConfService, HttpClient]}
    ],
    declarations: [],
})
export class CoreModule {}
