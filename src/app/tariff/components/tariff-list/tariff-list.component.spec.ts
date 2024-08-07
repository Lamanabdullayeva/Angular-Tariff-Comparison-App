import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TariffListComponent } from './tariff-list.component';
import { ITarif } from '../../interfaces/i-tarif';
import { CommonModule } from '@angular/common';
import { TariffService } from './tariff.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { NO_ERRORS_SCHEMA } from '@angular/core';

class MockTariffService {
  getTariffs(): ITarif[] {
    return [
      { id: 1, name: 'Tariff A', price: 3.5, supplier: 'Company A', description: 'Description of Tariff A' },
      { id: 2, name: 'Tariff B', price: 4.0, supplier: 'Company B', description: 'Description of Tariff B' },
      { id: 3, name: 'Tariff C', price: 4.5, supplier: 'Company C', description: 'Description of Tariff C' },
    ];
  }
}

describe('TariffListComponent', () => {
  let component: TariffListComponent;
  let fixture: ComponentFixture<TariffListComponent>;
  let mockTariffService: MockTariffService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TariffListComponent,
        CommonModule,
        ReactiveFormsModule,
        MatTableModule,
        MatSelectModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: TariffService, useClass: MockTariffService }],
      schemas: [NO_ERRORS_SCHEMA],  // Add NO_ERRORS_SCHEMA here
    }).compileComponents();

    fixture = TestBed.createComponent(TariffListComponent);
    component = fixture.componentInstance;
    mockTariffService = TestBed.inject(TariffService);
    fixture.detectChanges();  // Trigger initial data binding
  });

  it('should initialize the form with default values', () => {
    expect(component.sortFilterForm.get('sortOrder')?.value).toEqual('asc');
  });

  it('should render table with dynamic columns', () => {
    // Ensure that the table has the correct number of columns based on the data
    const compiled = fixture.nativeElement as HTMLElement;
    const headerRow = compiled.querySelector('tr.mat-header-row') as HTMLElement;
    expect(headerRow.children.length).toBe(Object.keys(component.tariffs[0]).length);
  });

  it('should sort tariffs in ascending order by default', () => {
    expect(component.dataSource.data[0].price).toBe(3.5);
    expect(component.dataSource.data[1].price).toBe(4.0);
    expect(component.dataSource.data[2].price).toBe(4.5);
  });

  it('should sort tariffs in descending order when selected', () => {
    component.sortFilterForm.get('sortOrder')?.setValue('desc');
    fixture.detectChanges();
    expect(component.dataSource.data[0].price).toBe(4.5);
    expect(component.dataSource.data[1].price).toBe(4.0);
    expect(component.dataSource.data[2].price).toBe(3.5);
  });
});
