import { Routes } from '@angular/router';
import { TariffMainComponent } from './tariff/components/tariff-main/tariff-main.component';
import { TariffComparisonPageComponent } from './tariff/components/tariff-comparison-page/tariff-comparison-page.component';

export const routes: Routes = [
    { path: '', component: TariffMainComponent },
    { path: 'compare', component: TariffComparisonPageComponent },
  ];
