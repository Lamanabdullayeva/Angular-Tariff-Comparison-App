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
  // holds the English labels for localization
  public readonly labels = en;

  constructor(public readonly tariffService: TariffService) {}

  // removes the selected tariff from the list
  removeFromCompare(tariff: ITarif): void {
    this.tariffService.tariffComparisonList =
      this.tariffService.tariffComparisonList.filter((t) => t !== tariff);
  }
}
