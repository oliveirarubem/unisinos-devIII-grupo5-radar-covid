import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiWpAdminConfService } from '../api-wp-admin.model';
import { Region, RegionData, User, UserData } from '../../../app.model';

export class WpAdminCreateUpdateRequestBase<T> {
    readonly action = 'createUpdate';
    nom: string;
    tip: number; // 2 = Região (padrão); 3 = Usuário;
    data: T;
}

export class WpAdminCreateUserRequest extends WpAdminCreateUpdateRequestBase<UserData> {
    readonly tip = 3;
}

export class WpAdminUpdateUserRequest extends WpAdminCreateUpdateRequestBase<UserData> {
    readonly tip = 3;
    id: string;
}


export class WpAdminCreateUserRegionRequest extends WpAdminCreateUpdateRequestBase<RegionData> {
    readonly tip = 2;
    usr: number;
}

export class WpAdminUpdateUserRegionRequest extends WpAdminCreateUpdateRequestBase<UserData> {
    readonly tip = 2;
    id: string;
}


export interface WpAdminCreateUserResponse {
    ID: number;
    nom: string;
    tip: string[];
    data: WpAdminUserDataResponse;
    usr: number;
}

export interface WpAdminUserDataResponse {
    nomeApelido: string;
}


export class WpAdminGetUsersRequest {
    readonly action = 'getUsers';
    nom: string;
}

export interface WpAdminGetUsersResponse {
    id: number;
    name: string;
    data: WpAdminUserDataResponse;
    regions: WpAdminGetUsersRegionResponse[];
}

export interface WpAdminGetUsersRegionResponse {
    id: number;
    name: string;
    data: WpAdminRegionDataResponse;
}

export interface WpAdminRegionDataResponse {
    ibeCode: string;
}

export interface WpAdminCreateRegionResponse {
    ID: number;
    nom: string;
    tip: string[];
    data: WpAdminRegionDataResponse;
    usr: number;
}



export abstract class WpAdminService {
    constructor(protected apiConf: ApiWpAdminConfService) {
    }

    protected extractParamsRequest(dataRequest: any): HttpParams {
        let ret = new HttpParams();
        for (const prop in dataRequest) {
            let val = dataRequest[prop];
            // apenas agrega campos que possuem valores não defaults/nulos
            if (typeof val === 'object') {
                val = JSON.stringify(val);
            }

            if (val && val !== 0) {
                ret = ret.append(prop, val);
            }
        }
        return ret;
    }

    abstract createUser(request: WpAdminCreateUserRequest): Observable<User>;

    abstract updateUser(request: WpAdminUpdateUserRequest): Observable<User>;

    abstract getUser(request: WpAdminGetUsersRequest): Observable<User>;

    abstract createRegion(request: WpAdminCreateUserRegionRequest): Observable<Region>;

    abstract updateRegion(request: WpAdminUpdateUserRegionRequest): Observable<Region>;
}
