import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {
    WpAdminCreateRegionResponse,
    WpAdminCreateUserRegionRequest,
    WpAdminCreateUserRequest,
    WpAdminCreateUserResponse,
    WpAdminGetUsersRegionResponse,
    WpAdminGetUsersRequest,
    WpAdminGetUsersResponse,
    WpAdminRegionDataResponse,
    WpAdminService, WpAdminUpdateUserRegionRequest, WpAdminUpdateUserRequest,
    WpAdminUserDataResponse,
} from './wp-admin.service';
import { ApiWpAdminConfService } from '../api-wp-admin.model';
import { Region, RegionData, User, UserData } from '../../../app.model';

export class WpAdminPrdService extends WpAdminService {
    constructor(
        protected apiConf: ApiWpAdminConfService,
        private httpClient: HttpClient,
    ) {
        super(apiConf);
    }

    private getApiHeaders(): HttpHeaders {
        let ret: HttpHeaders = new HttpHeaders();
        ret = ret.append(
            'Content-Type',
            'application/json',
        );

        return ret;
    }


    createUser(request: WpAdminCreateUserRequest): Observable<User> {
        return this.httpClient
                   .get<WpAdminCreateUserResponse>(this.apiConf.getUriConf().wp_admin.create_update, {
                       headers: this.getApiHeaders(),
                       params: this.extractParamsRequest(request),
                   })
                   .pipe(
                       take(1),
                       map(resp => {
                           let data: UserData;
                           if (resp.data && resp.data.nomeApelido) {
                               data = new UserData(resp.data.nomeApelido);
                           }
                           return new User(resp.ID, resp.nom, data);
                       })
                   );
    }

    updateUser(request: WpAdminUpdateUserRequest): Observable<User> {
        return this.httpClient
                   .get<WpAdminCreateUserResponse>(this.apiConf.getUriConf().wp_admin.create_update, {
                       headers: this.getApiHeaders(),
                       params: this.extractParamsRequest(request),
                   })
                   .pipe(
                       take(1),
                       map(resp => {
                           return new User(resp.ID, resp.nom, this.convertUserData(resp.data));
                       })
                   );
    }

    getUser(request: WpAdminGetUsersRequest): Observable<User> {
        return this.httpClient
                   .get<WpAdminGetUsersResponse[]>(this.apiConf.getUriConf().wp_admin.get_users, {
                       headers: this.getApiHeaders(),
                       params: this.extractParamsRequest(request),
                   })
                   .pipe(
                       take(1),
                       map(resp => {
                           if (resp && resp.length > 0) {
                               const user: WpAdminGetUsersResponse = resp[0];

                               const regions: Region[] = [];
                               if (user.regions) {
                                   user.regions.forEach(respReg => {
                                       const region: Region = this.convertRegion(respReg, user.id);
                                       regions.push(region);
                                   });
                               }
                               return new User(user.id, user.name, this.convertUserData(user.data), regions);
                           } else {
                               return null;
                           }
                       })
                   );
    }

    createRegion(request: WpAdminCreateUserRegionRequest): Observable<Region> {
        return this.httpClient
                   .get<WpAdminCreateRegionResponse>(this.apiConf.getUriConf().wp_admin.create_update, {
                       headers: this.getApiHeaders(),
                       params: this.extractParamsRequest(request),
                   })
                   .pipe(
                       take(1),
                       map(resp => {
                           return new Region(resp.ID, resp.nom, this.convertRegionData(resp.data), resp.usr);
                       })
                   );
    }

    updateRegion(request: WpAdminUpdateUserRegionRequest): Observable<Region> {
        return this.httpClient
                   .get<WpAdminCreateRegionResponse>(this.apiConf.getUriConf().wp_admin.create_update, {
                       headers: this.getApiHeaders(),
                       params: this.extractParamsRequest(request),
                   })
                   .pipe(
                       take(1),
                       map(resp => {
                           return new Region(resp.ID, resp.nom, this.convertRegionData(resp.data), resp.usr);
                       })
                   );
    }



    private convertRegion(respReg: WpAdminGetUsersRegionResponse, userId: number) {
        const region: Region = new Region(respReg.id, respReg.name, this.convertRegionData(respReg.data), userId);
        return region;
    }

    private convertUserData(dataResp: WpAdminUserDataResponse) {
        let data: UserData;
        if (dataResp && dataResp.nomeApelido) {
            data = new UserData(dataResp.nomeApelido);
        }
        return data;
    }

    private convertRegionData(dataResp: WpAdminRegionDataResponse) {
        let regData: RegionData;
        if (dataResp && dataResp.ibeCode) {
            regData = new RegionData(dataResp.ibeCode);
        }
        return regData;
    }
}
