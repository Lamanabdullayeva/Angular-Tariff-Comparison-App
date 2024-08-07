import { Component } from '@angular/core';
import { TariffService } from '../../services/tariff.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ITarif } from '../../interfaces/i-tarif';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

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
  constructor(public readonly tariffService: TariffService) {}

  dataSource = new MatTableDataSource<ITarif>();
  displayedColumns: string[] = [];

  public readonly labels = {
    goBack: 'Go back',
  };

  ngOnInit(): void {
    this.dataSource.data = this.tariffService.tariffComparisonList;
    if (this.dataSource.data.length > 0) {
      this.displayedColumns = Object.keys(this.dataSource.data[0]);
    }
  }
}
