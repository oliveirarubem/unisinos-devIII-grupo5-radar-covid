import { Injectable } from '@angular/core';
import { DatasetDataFullService } from '../../../core/api/brasil-io-api/dataset-data-full/dataset-data-full.service';
import { UserService } from '../../login/user.service';
import { Observable } from 'rxjs';
import { WpAdminCreateUserRegionRequest, WpAdminDeleteRequest, WpAdminService } from '../../../core/api/backend/wp-admin/wp-admin.service';
import { Region, RegionData } from '../../../core/app.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RegionService {
    private _region: Region;

    constructor(
        private wpAdminService: WpAdminService,
        private datasetDataFullService: DatasetDataFullService,
        private userService: UserService
    ) {
    }

    get region(): Region {
        return this._region;
    }

    register(name: string, ibgeCode: number): Observable<boolean> {
        const req: WpAdminCreateUserRegionRequest = new WpAdminCreateUserRegionRequest();
        req.nom = name;
        req.usr = this.userService.user.id;
        req.data = new RegionData(ibgeCode);
        return this.wpAdminService.createRegion(req)
                   .pipe(map(region => {
                       this.selectRegion(region);
                       return Boolean(this.region);
                   }));
    }

    selectRegion(region: Region): Region {
        this._region = region;
        return this._region;
    }

    delete(region: Region): Observable<boolean> {
        const req: WpAdminDeleteRequest = new WpAdminDeleteRequest();
        req.id = region.id;
        return this.wpAdminService.deleteRegion(req)
                   .pipe(map(resp => {
                       return Boolean(resp);
                   }));
    }
}
