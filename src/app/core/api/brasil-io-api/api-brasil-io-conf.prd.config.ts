import { ApiBrasilIoConfService, ApiBrasilIoUriConf } from './api-brasil-io.model';

export class ApiBrasilIoConfPrdTest extends ApiBrasilIoConfService {
  getSearchKeysForUrlAPIIdentification(): string[] {
    return ['dsiame.estacio.rj.br:17033/SIAServices/rest'];
  }

  getUriConf(): ApiBrasilIoUriConf {
    const BASE = 'https://api.brasil.io/v1/dataset/covid19';

    return {
      dataset: {
        covid19: {
          caso_full: BASE + '/caso_full/data/',
        },
      },
    };
  }
}
