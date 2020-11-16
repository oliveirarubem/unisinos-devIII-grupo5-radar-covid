import { ApiConfService, ApiUriConf } from './api.model';

export class ConfPrdTest extends ApiConfService {
  getSearchKeysForUrlAPIIdentification(): string[] {
    return ['dsiame.estacio.rj.br:17033/SIAServices/rest'];
  }

  getUriConf(): ApiUriConf {
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
