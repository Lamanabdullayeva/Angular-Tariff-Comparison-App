import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { en } from '../../../i18n/en';
import { ITarif } from '../../interfaces/i-tarif';
import { TariffService } from '../../services/tariff.service';

@Component({
  selector: 'app-tariff-comparison-list',
  standalone: true,
  imports: [CommonModule, MatListModule, RouterModule, MatButtonModule],
  templateUrl: './tariff-comparison-list.component.html',
  styleUrl: './tariff-comparison-list.component.scss',
})
export class TariffComparisonListComponent {
  // The `labels` property holds localized strings for the UI, which are imported from the English language file.
  public readonly labels = en;

  constructor(public readonly tariffService: TariffService) {}

  /**
   * Method to remove a selected tariff from the comparison list.
   *
   * @param {ITarif} tariff - The tariff to remove from the comparison list.
   * This method filters the `tariffComparisonList` array, removing the specified tariff.
   */
  removeFromCompare(tariff: ITarif): void {
    this.tariffService.tariffComparisonList =
      this.tariffService.tariffComparisonList.filter((t) => t !== tariff);
  }
}
