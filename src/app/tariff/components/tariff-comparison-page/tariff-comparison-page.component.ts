import { Component } from '@angular/core';
import { TariffService } from '../../services/tariff.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ITarif } from '../../interfaces/i-tarif';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { en } from '../../../i18n/en';

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
  public readonly labels = en;

  dataSource = new MatTableDataSource<ITarif>();
  displayedColumns: string[] = [];

  constructor(public readonly tariffService: TariffService) {}

  ngOnInit(): void {
    this.dataSource.data = this.tariffService.tariffComparisonList;
    if (this.dataSource.data.length > 0) {
      this.displayedColumns = Object.keys(this.dataSource.data[0]);
    }
  }
}
