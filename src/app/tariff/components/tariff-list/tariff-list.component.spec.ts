import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ITarif } from '../../interfaces/i-tarif';
import { TariffService } from '../../services/tariff.service';
import { TariffListComponent } from './tariff-list.component';

class MockTariffService {
  private _tariffComparisonList: ITarif[] = [];

  public get tariffComparisonList(): ITarif[] {
    return this._tariffComparisonList;
  }
  public set tariffComparisonList(value: ITarif[]) {
    this._tariffComparisonList = value;
  }

  getTariffs(): ITarif[] {
    return [
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
        price: 4.5,
        supplier: 'Company C',
        description: 'Description of Tariff C',
      },
    ];
  }
}

describe('TariffListComponent', () => {
  let component: TariffListComponent;
  let fixture: ComponentFixture<TariffListComponent>;
  let mockTariffService: MockTariffService;

  beforeEach(async () => {
    mockTariffService = new MockTariffService();

    await TestBed.configureTestingModule({
      imports: [
        TariffListComponent,
        ReactiveFormsModule,
        MatSelectModule,
        MatCardModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: TariffService, useValue: mockTariffService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TariffListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial data binding
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display tariffs', () => {
    component.fetchData();
    expect(component.tariffs.length).toBe(3);
    expect(component.tariffs[0].name).toBe('Tariff A');
    expect(component.tariffs[1].name).toBe('Tariff B');
    expect(component.tariffs[2].name).toBe('Tariff C');
  });

  it('should sort tariffs in ascending order by default', () => {
    component.sortTariffs('asc');
    fixture.detectChanges();
    expect(component.tariffs[0].price).toBe(3.5);
    expect(component.tariffs[2].price).toBe(4.5);
  });

  it('should sort tariffs in descending order', () => {
    component.sortTariffs('desc');
    fixture.detectChanges();
    expect(component.tariffs[0].price).toBe(4.5);
    expect(component.tariffs[2].price).toBe(3.5);
  });

  it('should add tariff to comparison list if less than 3', () => {
    component.fetchData();
    const tariff = component.tariffs[0];
    component.addToCompare(tariff);
    expect(mockTariffService.tariffComparisonList.length).toBe(1);
    expect(mockTariffService.tariffComparisonList[0].id).toBe(1);
  });

  it('should not add more than 3 tariffs to comparison list', () => {
    component.addToCompare(component.tariffs[0]);
    component.addToCompare(component.tariffs[1]);
    component.addToCompare(component.tariffs[2]);

    expect(mockTariffService.tariffComparisonList.length).toBe(3);

    // Attempt to add a fourth tariff
    const extraTariff = {
      id: 4,
      name: 'Tariff D',
      price: 5.0,
      supplier: 'Company D',
      description: 'Description of Tariff D',
    };
    component.addToCompare(extraTariff);

    expect(mockTariffService.tariffComparisonList.length).toBe(3); // Still 3
  });

  it('should not add duplicate tariffs to comparison list', () => {
    component.addToCompare(component.tariffs[0]);
    component.addToCompare(component.tariffs[0]);
    expect(mockTariffService.tariffComparisonList.length).toBe(1); // Still 1, no duplicates
  });
});
