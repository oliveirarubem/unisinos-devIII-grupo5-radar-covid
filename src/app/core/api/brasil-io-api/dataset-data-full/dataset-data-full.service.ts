import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfService } from '../api.model';

export interface DatasetDataFullRequest {
  city: string;
  is_last: 'True';
}

export interface ReportResponse {
  city: string;
  city_ibge_code: number;
  date: string;
  epidemiological_week: number;
  estimated_population: number;
  estimated_population_2019: number;
  is_last: boolean;
  is_repeated: boolean;
  last_available_confirmed: number;
  last_available_confirmed_per_100k_inhabitants: number;
  last_available_date: string;
  last_available_death_rate: number;
  last_available_deaths: number;
  new_confirmed: number;
  new_deaths: number;
  order_for_place: number;
  place_type: string;
  state: string;
}

export abstract class DatasetDataFullService {
  constructor(protected apiConf: ApiConfService) {}

  protected extractParamsRequest(dataRequest: any): HttpParams {
    let ret = new HttpParams();
    for (const prop in dataRequest) {
      const val = dataRequest[prop];
      // apenas agrega campos que possuem valores não defaults/nulos
      if (val && val !== 0) {
        ret = ret.append(prop, dataRequest[prop]);
      }
    }
    return ret;
  }

  abstract report(
    requestData: DatasetDataFullRequest,
  ): Observable<ReportResponse[]>;
}
