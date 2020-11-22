import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiWpAdminConfService } from './api/backend/api-wp-admin.model';
import { ApiWpAdminConfPrdTest } from './api/backend/api-wp-admin-conf.prd.config';
import { WpAdminService } from './api/backend/wp-admin/wp-admin.service';
import { WpAdminPrdService } from './api/backend/wp-admin/wp-admin.prd.service';
import { HttpClient } from '@angular/common/http';
import { ApiBrasilIoConfService } from './api/brasil-io-api/api-brasil-io.model';
import { ApiBrasilIoConfPrdTest } from './api/brasil-io-api/api-brasil-io-conf.prd.config';
import { DatasetDataFullService } from './api/brasil-io-api/dataset-data-full/dataset-data-full.service';
import { DatasetDataFullPrdService } from './api/brasil-io-api/dataset-data-full/dataset-data-full.prd.service';


@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        {provide: ApiWpAdminConfService, useClass: ApiWpAdminConfPrdTest},
        {provide: WpAdminService, useClass: WpAdminPrdService, deps: [ApiWpAdminConfService, HttpClient]},
        {provide: ApiBrasilIoConfService, useClass: ApiBrasilIoConfPrdTest},
        {provide: DatasetDataFullService, useClass: DatasetDataFullPrdService, deps: [ApiBrasilIoConfService, HttpClient]},
    ],
    declarations: [],
})
export class CoreModule {}
