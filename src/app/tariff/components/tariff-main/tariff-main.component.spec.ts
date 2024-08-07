import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TariffMainComponent } from './tariff-main.component';

describe('TariffMainComponent', () => {
  let component: TariffMainComponent;
  let fixture: ComponentFixture<TariffMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TariffMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TariffMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
