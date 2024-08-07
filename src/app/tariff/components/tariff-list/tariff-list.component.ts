import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { en } from '../../../i18n/en';
import { ITarif } from '../../interfaces/i-tarif';
import { TariffService } from '../../services/tariff.service';

@Component({
  selector: 'app-tariff-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSelectModule,
    RouterModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './tariff-list.component.html',
  styleUrl: './tariff-list.component.scss',
})
export class TariffListComponent implements OnInit {
  // The `labels` property holds localized strings for the UI, which are imported from the English language file
  public readonly labels = en;

  // holds the list of tariffs to be displayed
  tariffs: ITarif[] = [];

  // a reactive form that holds the sort order selected by the user
  sortFilterForm = new FormGroup({
    sortOrder: new FormControl('asc'),
  });

  constructor(public readonly tariffService: TariffService) {}

  ngOnInit(): void {
    // fetches the list of tariffs
    this.fetchData();

    // sets up a listener to sort the list when the sort order changes
    this.sortFilterForm.get('sortOrder')?.valueChanges.subscribe((order) => {
      this.sortTariffs(order);
    });
  }

  // fetches the tariff data from the TariffService
  private fetchData() {
    this.tariffs = this.tariffService.getTariffs();
  }

  /**
   * sorts the list of tariffs based on the selected order
   * It sorts the tariffs in ascending or descending order based on their price
   *
   * @param {string | null} order - The order in which to sort the tariffs, either 'asc' for ascending or 'desc' for descending
   */
  private sortTariffs(order: string | null): void {
    this.tariffs = this.tariffs.sort((a, b) =>
      order === 'asc' ? a.price - b.price : b.price - a.price
    );
  }

  /**
   * adds the selected tariff to the comparison list
   * The comparison list is limited to a maximum of three tariffs
   *
   * @param {ITarif} tariff - The tariff to be added to the comparison list
   */
  addToCompare(tariff: ITarif): void {
    if (
      this.tariffService.tariffComparisonList.length < 3 &&
      !this.tariffService.tariffComparisonList.find((t) => t.id === tariff.id)
    ) {
      this.tariffService.tariffComparisonList = [
        ...this.tariffService.tariffComparisonList,
        tariff,
      ];
    } else if (this.tariffService.tariffComparisonList.length >= 3) {
      alert('You can only compare up to 3 tariffs.');
    }
  }
}
