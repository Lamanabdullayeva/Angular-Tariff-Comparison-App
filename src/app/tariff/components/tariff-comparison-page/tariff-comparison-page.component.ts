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
  // holds the English labels for localization
  public readonly labels = en;

  dataSource = new MatTableDataSource<ITarif>();

  // list of column names to display
  displayedColumns: string[] = [];

  constructor(public readonly tariffService: TariffService) {}

  ngOnInit(): void {
    this.prepareData();
  }

  private prepareData() {
    // fetches the data from TariffService on initialization
    this.dataSource.data = this.tariffService.tariffComparisonList;

    // prepares the column names to display
    if (this.dataSource.data.length > 0) {
      this.displayedColumns = Object.keys(this.dataSource.data[0]);
    }
  }
}
