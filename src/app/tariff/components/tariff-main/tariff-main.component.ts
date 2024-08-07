import { Component } from '@angular/core';
import { TariffListComponent } from '../tariff-list/tariff-list.component';
import { TariffComparisonListComponent } from '../tariff-comparison-list/tariff-comparison-list.component';
import { en } from '../../../i18n/en';

@Component({
  selector: 'app-tariff-main',
  standalone: true,
  imports: [TariffListComponent, TariffComparisonListComponent],
  templateUrl: './tariff-main.component.html',
  styleUrl: './tariff-main.component.scss',
})
export class TariffMainComponent {
  // The `labels` property holds localized strings for the UI, which are imported from the English language file
  public readonly labels = en;
}
