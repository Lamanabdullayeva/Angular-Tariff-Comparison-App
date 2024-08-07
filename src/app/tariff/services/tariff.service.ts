import { Injectable } from '@angular/core';
import { ITarif } from '../interfaces/i-tarif';

@Injectable({
  providedIn: 'root',
})
export class TariffService {
  constructor() {}

  getTariffs(): ITarif[] {
    return [
      {
        id: 1,
        name: 'Tariff A',
        price: 3.5,
        supplier: 'Company A',
        description: 'Description of Tariff A',
      },
      {
        id: 2,
        name: 'Tariff B',
        price: 4.0,
        supplier: 'Company B',
        description: 'Description of Tariff B',
      },
      {
        id: 3,
        name: 'Tariff C',
        price: 3.8,
        supplier: 'Company C',
        description: 'Description of Tariff C',
      },
    ];
  }

  // stores the tariff list for comparison
  private _tariffComparisonList: ITarif[] = [];

  public get tariffComparisonList(): ITarif[] {
    return this._tariffComparisonList;
  }
  public set tariffComparisonList(value: ITarif[]) {
    this._tariffComparisonList = value;
  }
}
