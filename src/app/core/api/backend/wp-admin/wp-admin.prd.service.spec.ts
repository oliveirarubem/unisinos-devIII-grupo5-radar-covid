import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { WpAdminPrdService } from './wp-admin.prd.service';
import { WpAdminCreateUserRequest, WpAdminGetUsersRequest, WpAdminService, } from './wp-admin.service';
import { ApiWpAdminConfPrdTest } from '../api-wp-admin-conf.prd.config';
import { ApiWpAdminConfService } from '../api-wp-admin.model';
import { User, UserData } from '../../../app.model';

describe('ApiWpAdmin - Cenario 1 - [PRD]', () => {
    let apiService: WpAdminService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                {provide: ApiWpAdminConfService, useClass: ApiWpAdminConfPrdTest},
                {provide: WpAdminService, useClass: WpAdminPrdService, deps: [ApiWpAdminConfService, HttpClient]},
            ],
        });

        apiService = TestBed.get(WpAdminService);
        expect(apiService).toBeTruthy();
        expect(apiService).not.toBeNull();
    });

    it('create an user', (done) => {
        const req: WpAdminCreateUserRequest = new WpAdminCreateUserRequest();
        req.nom = 'teste1@teste1.com';
        req.data = new UserData('nome de teste ');
        apiService.createUser(req).subscribe(
            (user: User) => {
                expect(user).toBeTruthy();
                done();
            },
            (error) => {
                expect(error).not.toBeTruthy();
                done();
            },
        );
    });

    it('get an user', (done) => {
        const req: WpAdminGetUsersRequest = new WpAdminGetUsersRequest();
        req.nom = 'teste@teste.com.br';
        apiService.getUser(req).subscribe(
            (user: User) => {
                expect(user).toBeTruthy();
                done();
            },
            (error) => {
                expect(error).not.toBeTruthy();
                done();
            },
        );
    });
});
