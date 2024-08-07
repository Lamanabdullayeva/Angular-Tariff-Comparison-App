import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TariffMainComponent } from './tariff-main.component';
import { TariffListComponent } from '../tariff-list/tariff-list.component';
import { TariffComparisonListComponent } from '../tariff-comparison-list/tariff-comparison-list.component';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TariffMainComponent', () => {
  let component: TariffMainComponent;
  let fixture: ComponentFixture<TariffMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TariffMainComponent,
        TariffListComponent,
        TariffComparisonListComponent,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({}),
            snapshot: {
              paramMap: {
                get: () => null,
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TariffMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the app title correctly', () => {
    const h2Element = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(h2Element.textContent).toContain(component.labels.HEADERS.APP_TITLE);
  });

  it('should render the TariffListComponent', () => {
    const tariffListComponent = fixture.debugElement.query(
      By.directive(TariffListComponent)
    );
    expect(tariffListComponent).toBeTruthy();
  });

  it('should render the TariffComparisonListComponent', () => {
    const tariffComparisonListComponent = fixture.debugElement.query(
      By.directive(TariffComparisonListComponent)
    );
    expect(tariffComparisonListComponent).toBeTruthy();
  });

  it('should display the localized title in the header', () => {
    const headerElement = fixture.debugElement.query(
      By.css('h2')
    ).nativeElement;
    expect(headerElement.textContent.trim()).toBe(
      component.labels.HEADERS.APP_TITLE
    );
  });
});
