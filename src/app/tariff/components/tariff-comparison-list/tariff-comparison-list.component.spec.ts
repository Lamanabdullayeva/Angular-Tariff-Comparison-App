import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { TariffComparisonListComponent } from './tariff-comparison-list.component';
import { TariffService } from '../../services/tariff.service';
import { ITarif } from '../../interfaces/i-tarif';
import { By } from '@angular/platform-browser';

class MockTariffService {
  private _tariffComparisonList: ITarif[] = [];

  public get tariffComparisonList(): ITarif[] {
    return this._tariffComparisonList;
  }
  public set tariffComparisonList(value: ITarif[]) {
    this._tariffComparisonList = value;
  }
}

describe('TariffComparisonListComponent', () => {
  let component: TariffComparisonListComponent;
  let fixture: ComponentFixture<TariffComparisonListComponent>;
  let mockTariffService: MockTariffService;

  beforeEach(async () => {
    mockTariffService = new MockTariffService();

    await TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatListModule,
        RouterModule.forRoot([]),
        TariffComparisonListComponent,
      ],
      providers: [{ provide: TariffService, useValue: mockTariffService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TariffComparisonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the list of tariffs when there are items in the tariffComparisonList', () => {
    mockTariffService.tariffComparisonList = [
      {
        id: 1,
        name: 'Tariff A',
        price: 3.5,
        supplier: 'Company A',
        description: 'Description A',
      },
    ];
    fixture.detectChanges();

    const listItems = fixture.debugElement.queryAll(By.css('mat-list-item'));
    expect(listItems.length).toBe(1);
  });

  it('should display the empty template when tariffComparisonList is empty', () => {
    mockTariffService.tariffComparisonList = [];
    fixture.detectChanges();

    const emptyTemplate = fixture.debugElement.query(By.css('ng-template'));
    expect(emptyTemplate).toBeNull();
  });

  it('should enable the navigate button when tariffComparisonList has items', () => {
    mockTariffService.tariffComparisonList = [
      {
        id: 1,
        name: 'Tariff A',
        price: 3.5,
        supplier: 'Company A',
        description: 'Description A',
      },
    ];
    fixture.detectChanges();

    const navigateButton = fixture.debugElement.query(
      By.css('button[mat-raised-button]')
    );
    expect(navigateButton.nativeElement.disabled).toBeFalse();
  });

  it('should disable the navigate button when tariffComparisonList is empty', () => {
    mockTariffService.tariffComparisonList = [];
    fixture.detectChanges();

    const navigateButton = fixture.debugElement.query(
      By.css('button[mat-raised-button]')
    );
    expect(navigateButton.nativeElement.disabled).toBeTrue();
  });

  it('should remove a tariff from the comparison list when removeFromCompare is called', () => {
    mockTariffService.tariffComparisonList = [
      {
        id: 1,
        name: 'Tariff A',
        price: 3.5,
        supplier: 'Company A',
        description: 'Description A',
      },
      {
        id: 2,
        name: 'Tariff B',
        price: 4.0,
        supplier: 'Company B',
        description: 'Description B',
      },
    ];
    fixture.detectChanges();

    const initialLength = mockTariffService.tariffComparisonList.length;
    component.removeFromCompare(mockTariffService.tariffComparisonList[0]);
    fixture.detectChanges();

    expect(mockTariffService.tariffComparisonList.length).toBe(
      initialLength - 1
    );
    expect(
      mockTariffService.tariffComparisonList.find((t) => t.id === 1)
    ).toBeUndefined();
  });
});
