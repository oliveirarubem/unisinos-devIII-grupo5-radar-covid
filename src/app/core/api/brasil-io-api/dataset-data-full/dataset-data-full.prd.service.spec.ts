import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { DatasetDataFullPrdService } from './dataset-data-full.prd.service';
import {
  DatasetDataFullService,
  ReportResponse,
} from './dataset-data-full.service';
import { ConfPrdTest } from '../api-conf.prd.config';
import { ApiConfService } from '../api.model';

describe('BrasilIoApiDataset- Cenario 1 - [PRD]', () => {
  let estacioService: DatasetDataFullService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: ApiConfService, useClass: ConfPrdTest },
        {
          provide: DatasetDataFullService,
          useClass: DatasetDataFullPrdService,
          deps: [ApiConfService, HttpClient],
        },
      ],
    });

    estacioService = TestBed.get(DatasetDataFullService);
    expect(estacioService).toBeTruthy();
    expect(estacioService).not.toBeNull();
  });

  it('testa busca', (done) => {
    estacioService.report({ city: 'Canoas', is_last: 'True' }).subscribe(
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
