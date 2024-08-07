import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
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
  public readonly labels = {
    sort: 'Sort by Price',
    compare: 'Add to Compare',
  };

  tariffs: ITarif[] = [];

  sortFilterForm = new FormGroup({
    sortOrder: new FormControl('asc'),
  });

  constructor(public readonly tariffService: TariffService) {}

  ngOnInit(): void {
    this.tariffs = this.tariffService.getTariffs();

    this.sortFilterForm.get('sortOrder')?.valueChanges.subscribe((order) => {
      this.sortTariffs(order);
    });
  }

  sortTariffs(order: string | null): void {
    this.tariffs = this.tariffs.sort((a, b) =>
      order === 'asc' ? a.price - b.price : b.price - a.price
    );
  }

  addToCompare(tariff: ITarif): void {
    if (
      this.tariffService.tariffComparisonList.length < 3 &&
      !this.tariffService.tariffComparisonList.includes(tariff)
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
