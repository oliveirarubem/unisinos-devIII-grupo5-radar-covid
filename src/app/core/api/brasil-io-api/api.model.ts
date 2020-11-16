export interface ApiUriConf {
  dataset: {
    covid19: {
      caso_full: string;
    };
  };
}

export interface APITotemResponseBase<T> {
  count: number;
  next: string;
  previous: string;
  results: T;
}

export abstract class ApiConfService {
  abstract getSearchKeysForUrlAPIIdentification(): string[];
  abstract getUriConf(): ApiUriConf;
}
