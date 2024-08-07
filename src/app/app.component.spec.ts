import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { TariffListComponent } from './tariff/components/tariff-list/tariff-list.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, AppComponent, TariffListComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render TariffListComponent', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-tariff-list')).toBeTruthy();
  });
});