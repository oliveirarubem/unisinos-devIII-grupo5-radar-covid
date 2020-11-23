export class UserData {
    constructor(private _nomeApelido: string) {
    }

    get nomeApelido(): string {
        return this._nomeApelido;
    }

    toJSON() {
        return {
            nomeApelido: this._nomeApelido
        };
    }
}

export class User {
    constructor(private _id: number, private _email: string, private _data: UserData, private _regions?: Region[]) {
    }

    get id(): number {
        return this._id;
    }

    get email(): string {
        return this._email;
    }

    get data(): UserData {
        return this._data;
    }

    get regions(): Region[] {
        return this._regions;
    }
}


export class RegionData {
    constructor(private _ibgeCode: number) {
    }

    get ibgeCode(): number {
        return this._ibgeCode;
    }

    toJSON() {
        return {
            ibgeCode: this._ibgeCode
        };
    }
}

export class Region {
    constructor(private _id: number, private _name: string, private _data: RegionData, private _userId: number) {
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get data(): RegionData {
        return this._data;
    }

    get userId(): number {
        return this._userId;
    }
}


export const AppRoutes = {
    login: '/login',
    favorite: {
        home: '/pages/favorite/list',
        list: '/pages/favorite/list',
        create: '/pages/favorite/create',
    },
    home: '/pages',
    profile: '/pages/profile',
    report: '/pages/report',
    about: '/about'
};
