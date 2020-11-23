import { ApiWpAdminConfService, ApiWpAdminUriConf } from './api-wp-admin.model';

export class ApiWpAdminConfPrdTest extends ApiWpAdminConfService {
    getSearchKeysForUrlAPIIdentification(): string[] {
        return ['grupo5.rodrigotrindade.com/wp-admin/'];
    }

    getUriConf(): ApiWpAdminUriConf {
        // const BASE = 'https://127.0.0.1:8888/http://grupo5.rodrigotrindade.com/wp-admin/admin-ajax.php';
        const BASE = 'https://grupo5.rodrigotrindade.com/wp-admin/admin-ajax.php';
        return {
            wp_admin: {
                create_update: `${BASE}`,
                get_users: `${BASE}`,
                retrieve: `${BASE}`,
                delete: `${BASE}`
            },
        };
    }
}
