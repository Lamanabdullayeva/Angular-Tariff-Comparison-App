import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TariffComparisonPageComponent } from './tariff-comparison-page.component';

describe('TariffComparisonPageComponent', () => {
  let component: TariffComparisonPageComponent;
  let fixture: ComponentFixture<TariffComparisonPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TariffComparisonPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TariffComparisonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
