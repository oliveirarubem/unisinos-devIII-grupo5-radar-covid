export interface ApiWpAdminUriConf {
  wp_admin: {
    create_update: string;
    get_users: string;
    retrieve: string;
    delete: string;
  };
}

export abstract class ApiWpAdminConfService {
  abstract getSearchKeysForUrlAPIIdentification(): string[];
  abstract getUriConf(): ApiWpAdminUriConf;
}
