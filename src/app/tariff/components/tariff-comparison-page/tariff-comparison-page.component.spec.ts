import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TariffComparisonPageComponent } from './tariff-comparison-page.component';
import { ITarif } from '../../interfaces/i-tarif';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { TariffService } from '../../services/tariff.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

class MockTariffService {
  private _tariffComparisonList: ITarif[] = [
    {
      id: 1,
      name: 'Tariff A',
      price: 3.5,
      supplier: 'Company A',
      description: 'Description of Tariff A',
    },
    {
      id: 2,
      name: 'Tariff B',
      price: 4.0,
      supplier: 'Company B',
      description: 'Description of Tariff B',
    },
    {
      id: 3,
      name: 'Tariff C',
      price: 3.8,
      supplier: 'Company C',
      description: 'Description of Tariff C',
    },
  ];

  public get tariffComparisonList(): ITarif[] {
    return this._tariffComparisonList;
  }
}

describe('TariffComparisonPageComponent', () => {
  let component: TariffComparisonPageComponent;
  let fixture: ComponentFixture<TariffComparisonPageComponent>;
  let mockTariffService: MockTariffService;

  beforeEach(async () => {
    mockTariffService = new MockTariffService();

    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatButtonModule,
        TariffComparisonPageComponent,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: TariffService, useValue: mockTariffService },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TariffComparisonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate dataSource with tariffComparisonList from the service', () => {
    component.ngOnInit();
    expect(component.dataSource.data.length).toBe(3);
    expect(component.dataSource.data).toEqual(
      mockTariffService.tariffComparisonList
    );
  });

  it('should set displayedColumns based on the keys of the first item in the tariffComparisonList', () => {
    component.ngOnInit();
    expect(component.displayedColumns).toEqual(
      Object.keys(mockTariffService.tariffComparisonList[0])
    );
  });

  it('should render the correct number of columns in the table header', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const headerCells = fixture.nativeElement.querySelectorAll('th');
    expect(headerCells.length).toBe(
      Object.keys(mockTariffService.tariffComparisonList[0]).length
    );
  });

  it('should render the correct number of rows in the table body', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('tr');
    expect(rows.length).toBe(mockTariffService.tariffComparisonList.length + 1); //  + 1 for header row
  });
});
