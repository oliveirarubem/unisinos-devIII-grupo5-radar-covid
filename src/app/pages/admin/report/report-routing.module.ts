import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReportPage } from './report.page';
import { ReportResolverService } from './report-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: ReportPage,
        resolve: {
            list: ReportResolverService
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomePageRoutingModule {}

