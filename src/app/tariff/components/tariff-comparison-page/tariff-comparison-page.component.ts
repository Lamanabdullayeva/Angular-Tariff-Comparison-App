import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { en } from '../../../i18n/en';
import { ITarif } from '../../interfaces/i-tarif';
import { TariffService } from '../../services/tariff.service';

@Component({
  selector: 'app-tariff-comparison-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    RouterModule,
    MatButtonModule,
  ],
  templateUrl: './tariff-comparison-page.component.html',
  styleUrl: './tariff-comparison-page.component.scss',
})
export class TariffComparisonPageComponent {
  // The `labels` property holds localized strings for the UI, which are imported from the English language file
  public readonly labels = en;

  // used by the Angular Material table to display tariff data
  dataSource = new MatTableDataSource<ITarif>();

  // holds the names of the columns to be displayed in the table
  displayedColumns: string[] = [];

  constructor(public readonly tariffService: TariffService) {}

  ngOnInit(): void {
    this.prepareData();
  }

  /**
   * fetches and prepares the data for display in the table
   * It sets the `dataSource` with the data from `tariffService.tariffComparisonList`
   * It also dynamically sets the `displayedColumns` array based on the keys of the first item in the data array
   */
  private prepareData() {
    //fetches  the list of tariffs to be compared from the TariffService
    this.dataSource.data = this.tariffService.tariffComparisonList;

    if (this.dataSource.data.length > 0) {
      this.displayedColumns = Object.keys(this.dataSource.data[0]);
    }
  }
}
