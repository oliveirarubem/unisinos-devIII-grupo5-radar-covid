export interface ApiBrasilIoUriConf {
  dataset: {
    covid19: {
      caso_full: string;
    };
  };
}

export interface ApiBrasilIoResponseBase<T> {
  count: number;
  next: string;
  previous: string;
  results: T;
}

export abstract class ApiBrasilIoConfService {
  abstract getSearchKeysForUrlAPIIdentification(): string[];
  abstract getUriConf(): ApiBrasilIoUriConf;
}
