import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { DatasetDataFullPrdService } from './dataset-data-full.prd.service';
import {
  DatasetDataFullService,
  ReportResponse,
} from './dataset-data-full.service';
import { ApiBrasilIoConfPrdTest } from '../api-brasil-io-conf.prd.config';
import { ApiBrasilIoConfService } from '../api-brasil-io.model';

describe('ApiBrasilIo - Dataset - Cenario 1 - [PRD]', () => {
  let apiService: DatasetDataFullService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: ApiBrasilIoConfService, useClass: ApiBrasilIoConfPrdTest },
        {
          provide: DatasetDataFullService,
          useClass: DatasetDataFullPrdService,
          deps: [ApiBrasilIoConfService, HttpClient],
        },
      ],
    });

    apiService = TestBed.get(DatasetDataFullService);
    expect(apiService).toBeTruthy();
    expect(apiService).not.toBeNull();
  });

  it('testa busca', (done) => {
    apiService.report({ city: 'Canoas', is_last: 'True' }).subscribe(
      (token: ReportResponse[]) => {
        expect(token).toBeTruthy();
        done();
      },
      (error) => {
        expect(error).not.toBeTruthy();
        done();
      },
    );
  });
});
