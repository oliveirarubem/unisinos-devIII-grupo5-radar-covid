import { HttpClient, HttpHeaders } from '@angular/common/http';

import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { DatasetDataFullRequest, DatasetDataFullService, ReportResponse, } from './dataset-data-full.service';
import { ApiBrasilIoConfService, ApiBrasilIoResponseBase } from '../api-brasil-io.model';

export class DatasetDataFullPrdService extends DatasetDataFullService {
    constructor(
        protected apiConf: ApiBrasilIoConfService,
        private httpClient: HttpClient,
    ) {
        super(apiConf);
    }

    private getAuthHeaders(): HttpHeaders {
        let ret: HttpHeaders = new HttpHeaders();
        ret = ret.append(
            'Authorization',
            'Token 025158e9a55e6fad06acec0c721c6224f1b0a838',
        );
        return ret;
    }

    report(request: DatasetDataFullRequest): Observable<ReportResponse[]> {
        return new Observable<ReportResponse[]>((observer) => {
            this.httpClient
                .get(this.apiConf.getUriConf().dataset.covid19.caso_full, {
                    headers: this.getAuthHeaders(),
                    params: this.extractParamsRequest(request),
                })
                .pipe(take(1))
                .subscribe(
                    (res: ApiBrasilIoResponseBase<ReportResponse[]>) => {
                        observer.next(res.results);
                        observer.complete();
                    },
                    (httpError) => {
                        observer.error(httpError);
                        observer.complete();
                    },
                );
        });
    }
}
