import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TariffComparisonListComponent } from './tariff-comparison-list.component';

describe('TariffComparisonListComponent', () => {
  let component: TariffComparisonListComponent;
  let fixture: ComponentFixture<TariffComparisonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TariffComparisonListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TariffComparisonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
