import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { IbgeRegion } from './ibge-region.model';
import { Observable } from 'rxjs';

const IBGE_REGION: IbgeRegion[] = require('../../../assets/regions/br/ibge.json');

@Injectable({
    providedIn: 'root',
})
export class IbgeService {
    private regions: IbgeRegion[] = IBGE_REGION;


    getRegions(page?: number, size?: number): IbgeRegion[] {
        let regions = [];

        if (page && size) {
            regions = this.regions.slice((page - 1) * size, ((page - 1) * size) + size);
        } else {
            regions = this.regions;
        }

        return regions;
    }

    getRegionsAsync(page?: number, size?: number, timeout = 1000): Observable<IbgeRegion[]> {
        return new Observable<IbgeRegion[]>(observer => {
            observer.next(this.getRegions(page, size));
            observer.complete();
        }).pipe(delay(timeout));
    }
}
